---
sidebar_position: 3
title: Data Mapping
description: How legacy wiki data maps to the new system entities in PostgreSQL and Snipe-IT.
---

# Data Mapping

## Users

| Legacy source (`auth_user` table) | MakerLab field | Notes |
|---|---|---|
| `id` | `legacy_id` | Preserved for idempotent re-runs |
| `first_name + last_name` | `name` | Concatenated |
| `email` | `email` | Natural key; used for deduplication |
| `is_superuser` or `is_staff = true` | `role = "lab_technician"` | |
| Otherwise | `role = "student"` | Professor detection by email is approximate — _to verify_ |
| `username` (if starts with digits) | `nmec` | Student number extraction — _to verify_ |

**Role mapping rule (schema constraint: must be one of `student`, `professor`, `lab_technician`):**
- `is_superuser=True` or `is_staff=True` → `"lab_technician"`
- All others → `"student"` (professor detection via email pattern is approximate)

---

## Projects

| Legacy source | MakerLab field | Notes |
|---|---|---|
| `article.id` | `legacy_id` | |
| `article.title` | `name` | |
| `content` (parsed) | `description` | First 500 chars of plain text from wiki content |
| `<owner>` element | `created_by` | FK to migrated user |
| Always `"pending"` | `status` | `"draft"` would violate CHECK constraint |

**Status mapping (schema constraint: must be one of `pending`, `active`, `rejected`, `completed`, `archived`):**
- All legacy projects are imported with status `"pending"` regardless of their wiki state.

---

## Project members

| Legacy XML element | `project_members.role` |
|---|---|
| `<owner>` | `"leader"` |
| `<member>` | `"member"` |
| `<mentor>` | `"advisor"` |

Membership is derived from the project XML structure, not a separate table in the legacy data.

---

## Equipment models

Equipment articles in the wiki contain structured markdown-like content. The extractor parses:

| Wiki field | MakerLab field | Notes |
|---|---|---|
| Article title | `name` | |
| `** Família: **` | `family` | Category grouping |
| `** Sub-Família: **` | `sub_family` | |
| `** Código: **` | `reference_code` (normalized) + `legacy_reference_code` (exact) | Código is the equipment SKU |
| `** Preço (c/ IVA): **` | `price` | Parsed as Decimal; supports formats like `"8.61€"` |
| `** Fornecedor: **` | `supplier` | |
| `** Localização: **` | `location` | Stored at equipment level |

**Deduplication:** Multiple wiki revisions sharing the same `Código` are grouped into a single `EquipmentModel`. Each revision within the group becomes a separate physical asset.

**Equipment items with blank `Código` are skipped** — they cannot be used to create a model without an identifier.

---

## Equipment assets

| Legacy | MakerLab/Snipe-IT | Notes |
|---|---|---|
| Wiki article `id` | `legacy_id` in `equipment` | |
| Article `id` | Asset tag (e.g., `CODIGO-1`) | Unique per asset |
| `quantity` field (if > 1) | Multiple assets created | Each physical unit gets a sequential tag |
| `location` | `equipment.location` + Snipe-IT asset location | |
| Always `"available"` | `status` | All imported equipment defaults to available |

---

## Snipe-IT entity creation

| MakerLab entity | Snipe-IT entity | Lookup key |
|---|---|---|
| `EquipmentModel` | Snipe-IT Model | `model_number` (stores the `Código`) |
| `Equipment` | Snipe-IT Asset | `asset_tag` |
| `User` (technician) | Snipe-IT User | `email` |
| `EquipmentModel.family` | Snipe-IT Category | Category name |
| `EquipmentModel.supplier` | Snipe-IT Manufacturer | Manufacturer name |

Categories and manufacturers are **dynamically created** in Snipe-IT if they don't already exist. No pre-configuration is required.

---

## Idempotency

| Entity | Upsert key |
|---|---|
| User (PostgreSQL) | `legacy_id`, then `email` as fallback |
| Project (PostgreSQL) | `legacy_id` |
| Equipment model (PostgreSQL) | `legacy_id` |
| Equipment (PostgreSQL) | `legacy_id` |
| User (Snipe-IT) | `email` |
| Model (Snipe-IT) | `model_number` (Código) |
| Asset (Snipe-IT) | `asset_tag` |

Running the migration twice will upsert existing records without creating duplicates.

---

## Legacy ID columns

The following columns are added (if not already present) by the migration schema bootstrap step:

| Table | Column | Type |
|---|---|---|
| `users` | `legacy_id` | `BIGINT NULL UNIQUE` |
| `projects` | `legacy_id` | `BIGINT NULL UNIQUE` |
| `equipment_models` | `legacy_id` | `BIGINT NULL UNIQUE` |
| `equipment_models` | `legacy_reference_code` | `TEXT NULL` |
| `equipment` | `legacy_id` | `BIGINT NULL UNIQUE` |

These columns are already present in the current schema (`infra/db/init/schema.sql`). The migration bootstrap step uses `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` as a safety measure.
