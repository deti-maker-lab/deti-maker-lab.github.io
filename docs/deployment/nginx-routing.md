---
sidebar_position: 4
title: Nginx Routing
description: How Nginx routes traffic between the frontend, API, Snipe-IT, and SSO callback.
---

# Nginx Routing

Nginx acts as the single entry point for all HTTP/HTTPS traffic. It performs TLS termination, path-based routing, and technician-only access enforcement for Snipe-IT.

The configuration is defined as a **template** in `infra/nginx/templates/default.conf.template`, which is processed by `envsubst` at container startup to substitute environment variables from the `x-deployment` block.

---

## Upstream definitions

```nginx
upstream api       { server api:8000; }
upstream snipeit   { server snipeit:80; }
upstream frontend  { server web:3000; }
```

All upstream services are referenced by their Docker service names.

---

## HTTP → HTTPS redirect

```nginx
server {
    listen 80;
    server_name ${MAKERLAB_DOMAIN};
    return 301 https://$host$request_uri;
}
```

All HTTP requests are permanently redirected to HTTPS.

---

## HTTPS server block routes

### SSO callback — `/auth/auth`

```nginx
location = /auth/auth {
    proxy_pass http://api/auth/sso/callback$is_args$args;
    ...
}
```

This is a **fixed path**, independent of any base path prefix. It must match the callback URL registered with the University SSO provider (`identity.ua.pt`).

### Internal auth subrequest — `/auth-verify`

```nginx
location = /auth-verify {
    internal;
    proxy_pass http://api/auth/snipeit/verify$is_args$args;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
    proxy_set_header Cookie $http_cookie;
}
```

This location is marked `internal` — it cannot be accessed from the browser directly. It is used exclusively by the `auth_request` directive on the Snipe-IT route.

### API — `${NEXT_PUBLIC_API_URL}/`

```nginx
location ^~ ${NEXT_PUBLIC_API_URL}/ {
    rewrite ^${NEXT_PUBLIC_API_URL}/(.*) /$1 break;
    proxy_pass http://api;
    ...
}
```

Strips the path prefix before forwarding to FastAPI. For example, `/api/projects` → `/projects` at the API container.

### Snipe-IT (with auth gate) — `${SNIPEIT_PATH}/`

```nginx
location ^~ ${SNIPEIT_PATH}/ {
    auth_request /auth-verify;
    auth_request_set $sso_user $upstream_http_x_remote_user;
    proxy_set_header X-Remote-User $sso_user;
    ...
    error_page 401 = @error401_snipeit;
    error_page 403 = @error403_snipeit;
    rewrite ^${SNIPEIT_PATH}/(.*) /$1 break;
    proxy_pass http://snipeit;
}
```

Every request to Snipe-IT triggers a subrequest to `/auth-verify`. If the subrequest returns:
- `200 OK` — the request is proxied to Snipe-IT with the `X-Remote-User` header.
- `401` — the user is redirected to the SSO login.
- `403` — a Forbidden error is returned (non-technician user).

### Error handlers for Snipe-IT

```nginx
location @error401_snipeit {
    return 302 ${API_PUBLIC_URL}/auth/sso/login/mobile?web_redirect=${SNIPEIT_PUBLIC_URL}/;
}
location @error403_snipeit {
    return 403 "Forbidden: Only lab technicians have access to SnipeIT.";
}
```

### Frontend — `${NEXT_PUBLIC_BASE_PATH}` (regex)

```nginx
location ~ ^${NEXT_PUBLIC_BASE_PATH}(/|$) {
    proxy_pass http://frontend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    ...
}
```

A regex location prevents Nginx's automatic trailing-slash 301 redirect (which would conflict with Next.js's own redirect behavior).

### Root redirect

```nginx
location ~ ^(?!${NEXT_PUBLIC_BASE_PATH}(/|$)).*$ {
    return 301 ${FRONTEND_URL};
}
```

When `NEXT_PUBLIC_BASE_PATH` is set (e.g., `/new`), this redirects any path not under the base path to the frontend root. When `NEXT_PUBLIC_BASE_PATH` is empty, this regex never matches any valid path.

---

## Snipe-IT proxy headers

The Snipe-IT service requires these headers to generate correct absolute URLs:

```nginx
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port 443;
proxy_set_header X-Forwarded-Prefix ${SNIPEIT_PATH};
proxy_set_header X-Forwarded-Proto https;
```

`X-Forwarded-Prefix` tells Snipe-IT what path prefix it is served under, so it generates correct links in the admin UI.

---

## TLS configuration

```nginx
ssl_certificate     /etc/nginx/certs/selfsigned.crt;
ssl_certificate_key /etc/nginx/certs/selfsigned.key;
```

Replace with real certificates for production. See [Environment Configuration](./environment-configuration.md#tls-certificates).

---

## Common routing issues

| Symptom | Likely cause |
|---|---|
| SSO callback fails with 404 | Nginx does not have the `/auth/auth` location block or SSO callback URL mismatch |
| Snipe-IT shows 401 in a loop | Cookie not being passed to `/auth-verify` |
| Next.js returns 404 for all routes | `NEXT_PUBLIC_BASE_PATH` mismatch between build and Nginx config |
| API returns 404 for all routes | Path prefix rewrite issue; check `NEXT_PUBLIC_API_URL` in docker-compose |
| Snipe-IT generates wrong URLs | `APP_URL` or `X-Forwarded-Prefix` not set correctly |

See [Troubleshooting](./troubleshooting.md) for detailed solutions.
