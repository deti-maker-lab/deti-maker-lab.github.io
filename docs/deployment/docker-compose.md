---
sidebar_position: 2
title: Docker Compose
description: Docker Compose services, volumes, and network configuration.
---

# Docker Compose

The full stack is defined in `infra/docker/docker-compose.yml`.

---

## URL configuration anchor

The file begins with a YAML anchor block that centralizes all deployment URL variables:

```yaml
x-deployment: &deployment
  MAKERLAB_DOMAIN: "deti-makerlab.ua.pt"
  NEXT_PUBLIC_BASE_PATH: ""          # or "/new" for sub-path deployment
  FRONTEND_URL: "https://deti-makerlab.ua.pt"
  NEXT_PUBLIC_API_URL: "/api"
  API_PUBLIC_URL: "https://deti-makerlab.ua.pt/api"
  SNIPEIT_PATH: "/snipe-it"
  NEXT_PUBLIC_SNIPEIT_URL: "https://deti-makerlab.ua.pt/snipe-it"
  APP_URL: "https://deti-makerlab.ua.pt/snipe-it"
  SNIPEIT_PUBLIC_URL: "https://deti-makerlab.ua.pt/snipe-it"
```

This anchor is merged (`<<: *deployment`) into the `api`, `web`, `snipeit`, and `nginx` services. **Edit this block once to change all URL-related settings.**

After any change:
```bash
docker compose -f infra/docker/docker-compose.yml up -d --build
```

---

## Services

### `postgres`

```yaml
postgres:
  image: postgres:16
  container_name: makerlab-postgres
  restart: unless-stopped
  env_file: ../db/.env.postgres
  volumes:
    - makerlab_postgres:/var/lib/postgresql/data
    - ../db/init/schema.sql:/docker-entrypoint-initdb.d/schema.sql:ro
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U $POSTGRES_USER -d $POSTGRES_DB"]
    interval: 10s
    timeout: 5s
    retries: 10
  ports:
    - "5432:5432"
  networks: [backend]
```

The schema is applied automatically on first start via `docker-entrypoint-initdb.d`. Port 5432 is exposed for local development access. **In production, remove or restrict this port.**

---

### `api`

```yaml
api:
  build:
    context: ../../apps/api
  container_name: makerlab-api
  restart: unless-stopped
  env_file: ../../apps/api/.env
  environment:
    <<: *deployment
  depends_on:
    postgres:
      condition: service_healthy
  ports:
    - "8000:8000"
  networks: [backend]
```

The API container merges the `x-deployment` anchor into its runtime environment, overriding any conflicting values from `apps/api/.env`. Port 8000 is exposed for development. **In production, consider removing this direct port exposure.**

---

### `web`

```yaml
web:
  build:
    context: ../../apps/web
    args:
      <<: *deployment
  container_name: makerlab-web
  restart: unless-stopped
  expose:
    - "3000"
  networks: [backend]
```

The deployment anchor is passed as **build arguments** (`args:`) because Next.js bakes `NEXT_PUBLIC_*` variables at compile time. The web container is not directly exposed on any host port — it is accessed only through Nginx.

---

### `snipeit-db`

```yaml
snipeit-db:
  image: mariadb:11.4
  restart: unless-stopped
  env_file: ../snipeit/.env.snipeit
  volumes:
    - snipeit_db_data:/var/lib/mysql
  healthcheck:
    test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
    interval: 10s
    timeout: 5s
    retries: 10
  networks: [backend]
```

Internal MariaDB for Snipe-IT. No ports exposed to the host.

---

### `snipeit`

```yaml
snipeit:
  image: snipe/snipe-it:v8.3.6
  restart: unless-stopped
  env_file: ../snipeit/.env.snipeit
  environment:
    <<: *deployment
  depends_on:
    snipeit-db:
      condition: service_healthy
  volumes:
    - snipeit_storage:/var/lib/snipeit
  ports:
    - "8080:80"
  networks: [backend]
```

Port 8080 is exposed for direct local access during development. In production, Snipe-IT is accessed only through Nginx.

---

### `nginx`

```yaml
nginx:
  image: nginx:alpine
  container_name: makerlab-nginx
  restart: unless-stopped
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ../nginx/templates:/etc/nginx/templates:ro
    - ../nginx/certs:/etc/nginx/certs:ro
  environment:
    <<: *deployment
  depends_on: [api, web, snipeit]
  networks: [backend]
```

Nginx uses the official image's `envsubst` support — the template file in `nginx/templates/` is processed at container startup, substituting environment variables from the `x-deployment` anchor.

:::warning
Do NOT mount `conf.d/` to the Nginx container. The image writes the rendered template output to `/etc/nginx/conf.d/` internally at startup. A read-only bind-mount on that directory causes a crash loop.
:::

---

## Volumes

| Volume | Used by | Contents |
|---|---|---|
| `makerlab_postgres` | `postgres` | PostgreSQL data directory |
| `snipeit_db_data` | `snipeit-db` | MariaDB data directory |
| `snipeit_storage` | `snipeit` | Snipe-IT file uploads and storage |

---

## Network

All services share a single bridge network `backend`. Inter-service communication uses Docker service names as hostnames (e.g., `http://api`, `http://snipeit`, `postgres:5432`).

---

## Path prefix examples

### Under `/new` (sub-path deployment)

```yaml
x-deployment: &deployment
  MAKERLAB_DOMAIN: "deti-makerlab.ua.pt"
  NEXT_PUBLIC_BASE_PATH: "/new"
  FRONTEND_URL: "https://deti-makerlab.ua.pt/new"
  NEXT_PUBLIC_API_URL: "/new/api"
  API_PUBLIC_URL: "https://deti-makerlab.ua.pt/new/api"
  SNIPEIT_PATH: "/new/snipe-it"
  NEXT_PUBLIC_SNIPEIT_URL: "https://deti-makerlab.ua.pt/new/snipe-it"
  APP_URL: "https://deti-makerlab.ua.pt/new/snipe-it"
  SNIPEIT_PUBLIC_URL: "https://deti-makerlab.ua.pt/new/snipe-it"
```

### At root (no prefix)

```yaml
x-deployment: &deployment
  MAKERLAB_DOMAIN: "deti-makerlab.ua.pt"
  NEXT_PUBLIC_BASE_PATH: ""
  FRONTEND_URL: "https://deti-makerlab.ua.pt"
  NEXT_PUBLIC_API_URL: "/api"
  API_PUBLIC_URL: "https://deti-makerlab.ua.pt/api"
  SNIPEIT_PATH: "/snipe-it"
  NEXT_PUBLIC_SNIPEIT_URL: "https://deti-makerlab.ua.pt/snipe-it"
  APP_URL: "https://deti-makerlab.ua.pt/snipe-it"
  SNIPEIT_PUBLIC_URL: "https://deti-makerlab.ua.pt/snipe-it"
```
