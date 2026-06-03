---
sidebar_position: 2
title: Repository Structure
description: Explanation of the core monorepo layout and what each directory contains.
---

# Repository Structure

The `core` repository is a monorepo managed with **pnpm workspaces** and **Turborepo** for task orchestration.

---

## Top-level layout

```
core/
├── apps/
│   ├── api/          # FastAPI backend
│   ├── web/          # Next.js web application
│   ├── mobile/       # Expo / React Native mobile app
│   └── migration/    # Legacy wiki data migration CLI
├── infra/
│   ├── db/           # PostgreSQL initialization scripts and env config
│   ├── docker/       # Docker Compose configuration
│   ├── nginx/        # Nginx reverse proxy configuration
│   └── snipeit/      # Snipe-IT environment configuration
├── docs/             # Internal developer documentation
├── README.md         # Development setup guide
├── package.json      # Root workspace configuration
├── pnpm-workspace.yaml
└── turbo.json        # Turborepo task pipeline
```

---

## `apps/api` — FastAPI backend

```
apps/api/
├── auth/
│   ├── dependencies.py   # JWT dependency injection (get_current_user)
│   ├── router.py         # Auth endpoints: SSO login, callback, verify, logout
│   ├── schemas.py        # Pydantic schemas for auth responses
│   └── service.py        # OAuth1 flow, JWT creation, user provisioning
├── core/
│   └── config.py         # Settings loaded from .env
├── db/
│   ├── database.py       # SQLModel engine and session factory
│   └── models.py         # SQLModel table models
├── routers/
│   ├── equipment.py      # Equipment catalog and sync endpoints
│   ├── projects.py       # Project CRUD endpoints
│   ├── requisitions.py   # Requisition approval / sync endpoints
│   ├── schemas.py        # Pydantic request/response schemas
│   └── users.py          # User management endpoints
├── services/
│   ├── inventory_service.py      # Catalog sync logic
│   ├── notification_service.py   # Notification creation helpers
│   ├── project_service.py        # Project business logic
│   ├── requisition_service.py    # Requisition lifecycle logic
│   ├── users_service.py          # User update logic
│   └── snipeit/                  # Snipe-IT REST API client
├── tests/                        # API tests
├── main.py                       # FastAPI app entry point
├── requirements.txt
├── .env.example
└── Dockerfile
```

---

## `apps/web` — Next.js web application

```
apps/web/
├── src/
│   ├── app/
│   │   ├── admin/        # Admin management pages
│   │   ├── auth/         # SSO callback handler
│   │   ├── components/   # Shared UI components
│   │   ├── equipment/    # Equipment catalog pages
│   │   ├── ledger/       # Requisition ledger pages
│   │   ├── projects/     # Project pages
│   │   ├── statistics/   # Statistics pages (future work)
│   │   ├── users/        # User profile pages
│   │   ├── layout.tsx    # Root layout with navigation
│   │   └── page.tsx      # Dashboard / home page
│   ├── i18n.ts           # i18next configuration
│   ├── lib/              # API client and shared utilities
│   └── locales/          # Translation files
├── public/               # Static assets
├── next.config.ts
├── Dockerfile
└── package.json
```

---

## `apps/mobile` — Expo / React Native mobile app

```
apps/mobile/
├── app/
│   ├── (tabs)/           # Tab-based navigation screens
│   │   ├── index.tsx         # Dashboard / home tab
│   │   ├── equipment.tsx     # Equipment catalog tab
│   │   ├── ledger.tsx        # Requisition ledger tab
│   │   ├── projects.tsx      # Projects tab
│   │   ├── user.tsx          # User profile tab
│   │   ├── admin.tsx         # Admin tab (technician only)
│   │   ├── statistics.tsx    # Statistics tab
│   │   └── users.tsx         # Users management tab
│   ├── auth/             # Auth callback screen
│   ├── login.tsx         # Login screen
│   ├── modal.tsx         # Modal screen
│   └── _layout.tsx       # Root layout
├── components/           # Shared UI components
├── context/
│   └── AuthContext.tsx   # Authentication context provider
├── hooks/                # Custom React hooks
├── lib/                  # API client
├── constants/            # App constants
├── app.json              # Expo configuration
└── package.json
```

---

## `apps/migration` — Legacy data migration CLI

```
apps/migration/
├── makerlab_migrate/
│   ├── cli.py            # CLI entry point (argparse)
│   ├── settings.py       # Environment and configuration loader
│   ├── dump/             # Legacy dump reader and wiki content parser
│   ├── postgres/         # PostgreSQL upsert logic
│   ├── snipeit/          # Snipe-IT upsert client
│   └── orchestration/    # Migration coordinator
├── .env                  # Local migration environment
└── requirements.txt
```

---

## `infra/` — Infrastructure configuration

### `infra/db/`
- `.env.postgres.example` — PostgreSQL environment variable template.
- `init/schema.sql` — Full database schema, applied on first container start.
- `init/seed.sql` — Sample test data.

### `infra/docker/`
- `docker-compose.yml` — Complete stack definition with all six services.
- `bootstrap-snipeit.sh` — Automated Snipe-IT initialization and API token generation.

### `infra/nginx/`
- `templates/default.conf.template` — Nginx configuration template (processed with `envsubst` at container start).
- `certs/` — TLS certificate directory (certificates must be placed here).

### `infra/snipeit/`
- `.env.snipeit.example` — Snipe-IT environment variable template.

---

## `docs/` — Internal documentation

- `SNIPEIT.md` — Snipe-IT API token configuration guide.
- `runbooks/DEPLOY.md` — Production deployment runbook.
- `api/snipeit_asset_management.md` — Snipe-IT API endpoint reference.
- `migration/migration-module-plan-2d9421.md` — Migration module design document.
