---
sidebar_position: 6
title: Troubleshooting
description: Common deployment problems and their solutions.
---

# Troubleshooting

## Containers restart in a loop

**Symptom:** `docker ps` shows a container repeatedly restarting.

**Diagnosis:**
```bash
docker logs makerlab-api
docker logs makerlab-web
docker logs makerlab-nginx
```

**Common causes:**

| Container | Common cause | Fix |
|---|---|---|
| `api` | Missing or invalid env variable | Check `apps/api/.env` — all required variables must be present |
| `api` | Database not ready | Check PostgreSQL healthcheck; `api` depends on `postgres: service_healthy` |
| `web` | Invalid build argument | Rebuild with correct `x-deployment` values |
| `nginx` | Bad certificate path | Verify `infra/nginx/certs/` contains `selfsigned.crt` and `selfsigned.key` |
| `nginx` | Template substitution failure | Check that all `${VARIABLE}` values are present in the environment |
| `snipeit` | MariaDB not ready | Check `snipeit-db` healthcheck; Snipe-IT depends on it |

---

## Nginx routing / path prefix issues

**Symptom:** 404 errors for API or frontend routes.

**Common causes:**

1. **Mismatch between build-time and runtime base path.**
   - `NEXT_PUBLIC_BASE_PATH` in `docker-compose.yml` must match at both build time (`args:`) and runtime.
   - Rebuild after any change: `docker compose up -d --build web`.

2. **Nginx template not rendered.**
   - Check `docker logs makerlab-nginx` for `envsubst` errors.
   - Ensure all required environment variables are in the `x-deployment` block.

3. **API path prefix wrong.**
   - `NEXT_PUBLIC_API_URL` must equal `NEXT_PUBLIC_BASE_PATH` + `/api`.
   - E.g., base path `/new` → API URL `/new/api`.

---

## SSO redirect problems

**Symptom:** Login fails — user is redirected in a loop, or SSO callback returns an error.

**Common causes:**

1. **`SSO_CALLBACK_URL` does not match the registered URL.**
   - The URL registered with `identity.ua.pt` must exactly match `SSO_CALLBACK_URL` in `apps/api/.env`.
   - The callback is always at `/auth/auth` regardless of base path prefix.

2. **`DML_AUTH_KEY` or `DML_AUTH_SECRET` are wrong.**
   - Verify credentials from the University SSO provider.

3. **Nginx `/auth/auth` location block missing.**
   - Verify the template renders the exact location block.
   - Check `docker logs makerlab-nginx` for errors.

---

## Snipe-IT HTTPS / proxy issues

**Symptom:** Snipe-IT generates incorrect URLs, or links in the admin UI are broken.

**Common causes:**

1. **`APP_URL` does not include the path prefix.**
   - Set `APP_URL` to the full public URL including path prefix: `https://deti-makerlab.ua.pt/snipe-it`.

2. **`X-Forwarded-Prefix` header not set.**
   - The Nginx template includes this header. If the template is not rendering correctly, Snipe-IT may generate root-relative URLs.

3. **SSL certificate not trusted inside the container.**
   - When calling Snipe-IT's public URL from a local Python script (e.g., migration), SSL verification may fail with self-signed certs. Use `SNIPEIT_BASE_URL=http://snipeit` (internal) for server-side API calls.

---

## Snipe-IT access shows 401 (infinite SSO loop)

**Symptom:** Accessing Snipe-IT always redirects to SSO, even after login.

**Diagnosis:**
- Check that the JWT cookie `token` is being set by the browser after SSO.
- Check that Nginx is forwarding the `Cookie` header to `/auth-verify`.
- Check `docker logs makerlab-api` for errors in the verify endpoint.

**Common causes:**
- JWT has expired. Log out and log in again.
- Cookie domain mismatch between the API and the Nginx host.

---

## Database connection issues

**Symptom:** API returns 500 errors; logs show database connection errors.

**Diagnosis:**
```bash
docker logs makerlab-api   # look for "could not connect to server"
docker logs makerlab-postgres  # look for startup errors
```

**Common causes:**

1. **`DATABASE_URL` credentials do not match `POSTGRES_USER/PASSWORD`.**
   - Ensure the username and password in `DATABASE_URL` match the PostgreSQL credentials.

2. **PostgreSQL container not healthy yet.**
   - The API container waits for `postgres: service_healthy`, but if the healthcheck fails, the API may start without a database.
   - Check: `docker ps` — look for `(healthy)` next to the `makerlab-postgres` container.

3. **Volume already initialized with different credentials.**
   - If you change PostgreSQL credentials after the volume is created, the database will not accept the new credentials.
   - Reset: `docker compose down -v && docker compose up -d`.

---

## Migration failures

See [Migration → Validation](../migration/validation.md) for migration-specific troubleshooting.

**Common causes:**
- Snipe-IT is not accessible from the migration script.
- Invalid `SNIPEIT_API_TOKEN` in `apps/migration/.env`.
- Schema constraints violated (e.g., invalid role value).
- Dump file path is incorrect or the file is unreadable.
