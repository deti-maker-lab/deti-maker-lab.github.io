---
sidebar_position: 6
title: Database
description: PostgreSQL schema, main tables, constraints, and schema management.
---

# Database

## Overview

The MakerLab application uses **PostgreSQL 16** for all domain data. The schema is applied automatically on first container start.

Snipe-IT uses a separate **MariaDB 11.4** instance that is managed internally — the MakerLab application code never connects to it directly.

---

## Schema file

```
infra/db/init/schema.sql
```

This file is mounted into the PostgreSQL Docker container as:
```
/docker-entrypoint-initdb.d/schema.sql
```

It runs automatically when the PostgreSQL container starts for the first time (i.e., when the `makerlab_postgres` Docker volume is empty).

---

## Main tables

| Table | Primary key | Description |
|---|---|---|
| `users` | `id BIGSERIAL` | Registered users (auto-created on SSO login) |
| `projects` | `id BIGSERIAL` | Lab projects |
| `project_members` | `id BIGSERIAL` | User↔Project membership with role |
| `equipment_models` | `id BIGSERIAL` | Equipment model types (synced from Snipe-IT) |
| `equipment` | `id BIGSERIAL` | Physical asset instances (synced from Snipe-IT) |
| `equipment_request` | `id BIGSERIAL` | Equipment requisitions |
| `equipment_request_items` | `id BIGSERIAL` | Items within a requisition |
| `equipment_usage` | `id BIGSERIAL` | Usage records per checkout event |
| `status_history` | `id BIGSERIAL` | Immutable audit log of status changes |
| `notifications` | `id BIGSERIAL` | In-app notifications |

For the full schema with column definitions and FK relationships, see [Data Model](../architecture/data-model.md).

---

## Status constraints (CHECK constraints)

| Table | Column | Allowed values |
|---|---|---|
| `users` | `role` | `student`, `professor`, `lab_technician` |
| `projects` | `status` | `pending`, `active`, `rejected`, `completed`, `archived` |
| `project_members` | `role` | `leader`, `member`, `observer`, `advisor`, `supervisor` |
| `equipment` | `status` | `available`, `reserved`, `checked_out`, `maintenance`, `retired` |
| `equipment` | `condition` | `new`, `good`, `fair`, `damaged`, `unusable` |
| `equipment_usage` | `status` | `checked_out`, `returned`, `overdue`, `lost` |
| `status_history` | `entity_type` | `project`, `equipment_request`, `equipment_usage`, `equipment` |
| `notifications` | `type` | `info`, `warning`, `request`, `approval`, `return`, `reminder` |

:::warning
These CHECK constraints are enforced by PostgreSQL. Inserting a value outside the allowed set will raise a constraint violation error. Ensure application code always uses the exact allowed values.
:::

---

## Legacy ID columns

Several tables have a `legacy_id BIGINT UNIQUE` column used exclusively by the migration tool to track which records were imported from the legacy wiki. Normal application operations do not use these columns.

Tables with `legacy_id`:
- `users`
- `projects`
- `equipment_models`
- `equipment`

---

## Snipe-IT reference columns

| Table | Column | References |
|---|---|---|
| `equipment_models` | `snipeit_model_id` | Snipe-IT model ID |
| `equipment` | `snipeit_asset_id` | Snipe-IT asset ID |
| `equipment_request` | `snipeit_asset_id` | Snipe-IT asset ID being requested |

---

## Seed data

Test data can be loaded from:

```bash
docker compose -f infra/docker/docker-compose.yml exec -T postgres \
  psql -U makerlab -d makerlab < infra/db/init/seed.sql
```

---

## Database reset

To fully reset the schema and data (development only):

```bash
docker compose -f infra/docker/docker-compose.yml down -v
docker compose -f infra/docker/docker-compose.yml up -d
```

The `-v` flag removes the Docker volume. The schema is re-applied automatically on the next start.

:::warning
This deletes all data permanently. Use only in development environments.
:::

---

## Schema changes

There is no Alembic migration tooling in the repository. Schema changes are applied by:

1. Editing `infra/db/init/schema.sql`.
2. In development: reset the database (see above) or apply the change manually with `psql`.
3. In production: write and execute a manual `ALTER TABLE` migration.

All changes should be reviewed and tested before deploying to production.

---

## PostgreSQL environment variables

Configured in `infra/db/.env.postgres`:

```env
POSTGRES_USER=makerlab
POSTGRES_PASSWORD=CHANGE_ME_STRONG_PASSWORD
POSTGRES_DB=makerlab
```

The application database user `makerlab_app` (used in `DATABASE_URL`) should have only the permissions necessary to operate (SELECT, INSERT, UPDATE, DELETE on relevant tables). Using a separate app user instead of the superuser `makerlab` is best practice.

> **To verify:** the current schema may create the application using the superuser account. A separate, least-privilege app user should be configured for production.
