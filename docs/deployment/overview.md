---
sidebar_position: 1
title: Deployment Overview
description: Components, responsibilities, and deployment process for the DETI Maker Lab system.
---

# Deployment Overview

## Deployment components

The full production stack consists of six Docker containers coordinated by Docker Compose:

| Container | Image | Responsibility |
|---|---|---|
| `makerlab-postgres` | `postgres:16` | MakerLab domain database |
| `makerlab-api` | Built from `apps/api/Dockerfile` | FastAPI backend |
| `makerlab-web` | Built from `apps/web/Dockerfile` | Next.js web frontend |
| `snipeit-db` | `mariadb:11.4` | Snipe-IT internal database |
| `snipeit` | `snipe/snipe-it:v8.3.6` | Inventory management system |
| `makerlab-nginx` | `nginx:alpine` | Reverse proxy, TLS, routing, auth gate |

All containers communicate on a private Docker bridge network (`backend`). Only Nginx is exposed to the internet (ports 80 and 443).

---

## High-level deployment steps

1. **Clone the repository** on the server.
2. **Configure environment files** (`.env.postgres`, `.env.snipeit`, `apps/api/.env`).
3. **Place TLS certificates** in `infra/nginx/certs/`.
4. **Set deployment URL parameters** in `infra/docker/docker-compose.yml`.
5. **Start the stack** with `docker compose up -d --build`.
6. **Bootstrap Snipe-IT** with the bootstrap script.
7. **Configure Snipe-IT status labels.**
8. **(Optional) Run the data migration.**
9. **Verify all services are accessible.**

---

## Detailed steps

For a complete step-by-step deployment procedure, see:
- [Docker Compose](./docker-compose.md) — services, volumes, networks.
- [Environment Configuration](./environment-configuration.md) — all required variables.
- [Nginx Routing](./nginx-routing.md) — path prefixes and routing rules.
- [Production Checklist](./production-checklist.md) — pre-launch hardening.

---

## URL configuration

The stack supports deployment under a **path prefix** (e.g., `/new`) or at the **root path** (no prefix). All path-related variables are centralized in the `x-deployment` anchor block at the top of `docker-compose.yml`. Changing the base path requires rebuilding the containers.

---

## Updating the deployment

To deploy a new version:

```bash
git pull
docker compose -f infra/docker/docker-compose.yml up -d --build
```

:::warning
Rebuilding is required after any change to environment variables that are baked into the Next.js build at compile time (`NEXT_PUBLIC_*` variables).
:::
