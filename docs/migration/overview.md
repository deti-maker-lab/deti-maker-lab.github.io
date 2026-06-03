---
sidebar_position: 1
title: Migration Overview
description: Purpose, scope, and structure of the legacy data migration.
---

# Migration Overview

## Purpose

The migration tool imports legacy data from the DETI Maker Lab MediaWiki installation into the new system. It allows the lab to preserve historical records (users, projects, equipment) without losing the accumulated data from years of operation.

---

## What gets migrated

| Entity | Source | Destination |
|---|---|---|
| Users | `auth_user` table in the wiki PostgreSQL dump | `users` table in MakerLab PostgreSQL |
| Projects | Wiki article revisions of type `project` | `projects` table in MakerLab PostgreSQL |
| Project members | Project XML ownership/membership data | `project_members` table |
| Equipment models | Wiki article revisions of type `equipment` | `equipment_models` in PostgreSQL + Snipe-IT models |
| Equipment assets | Equipment wiki revisions (individual units) | `equipment` in PostgreSQL + Snipe-IT assets |

**What is NOT migrated (in the initial phase):**
- Equipment requisition history from the wiki.
- Wiki revision history (only the latest revision per article is used).
- Full-text wiki page content.

---

## Where migrated data goes

| Destination | What goes there |
|---|---|
| **PostgreSQL** | Users, projects, project members, equipment models, equipment records |
| **Snipe-IT** | Equipment models (as Snipe-IT models), equipment assets (as Snipe-IT assets), users |

Equipment models and assets are created in both systems. PostgreSQL stores the local `snipeit_model_id` and `snipeit_asset_id` references to link the two.

---

## Migration tool location

```
apps/migration/makerlab_migrate/
├── cli.py          # Entry point
├── settings.py     # Configuration loader
├── dump/           # Legacy dump reader and wiki content parser
├── postgres/       # PostgreSQL upsert logic
├── snipeit/        # Snipe-IT API client for migration
└── orchestration/  # Migration coordinator
```

---

## Key properties

- **Idempotent:** Safe to run multiple times. Uses upsert logic — no duplicates are created.
- **Incremental:** Supports incremental re-runs via checkpoint tracking.
- **Dry-run mode:** Preview all operations without writing any data.
- **Phase-based:** Runs in phases — users → projects → equipment — to respect foreign key dependencies.

---

## When to run migration

Migration is optional but recommended when:
- The new system is being deployed for the first time.
- You want to preserve historical project and user records from the old wiki.
- The lab has legacy equipment records you want visible in the catalog immediately.

Migration is **not** required for the system to function — it can be started fresh with no data.

---

## Prerequisites

Before running migration:
1. The Docker stack must be running (PostgreSQL and Snipe-IT must be accessible).
2. Snipe-IT must be bootstrapped (API token generated).
3. Snipe-IT status labels must be configured.
4. You must have the legacy wiki PostgreSQL dump file (e.g., `dump-1776931288`).
5. The migration environment file (`apps/migration/.env`) must be configured.
