---
sidebar_position: 4
title: Validation
description: How to verify a successful migration in PostgreSQL and Snipe-IT.
---

# Migration Validation

After running the migration, use this checklist to confirm that data was imported correctly.

---

## PostgreSQL validation

Connect to the PostgreSQL container:

```bash
docker compose -f infra/docker/docker-compose.yml exec postgres \
  psql -U makerlab -d makerlab
```

### Users

```sql
-- Count imported users
SELECT COUNT(*) FROM users WHERE legacy_id IS NOT NULL;

-- Verify role distribution
SELECT role, COUNT(*) FROM users GROUP BY role;

-- Spot-check a specific user
SELECT id, name, email, role, legacy_id FROM users WHERE email = 'user@ua.pt';
```

**Expected:** All imported users have `legacy_id` set. Roles are one of `student`, `professor`, `lab_technician`.

### Projects

```sql
-- Count imported projects
SELECT COUNT(*) FROM projects WHERE legacy_id IS NOT NULL;

-- Check status distribution
SELECT status, COUNT(*) FROM projects GROUP BY status;

-- Verify members
SELECT COUNT(*) FROM project_members;
```

**Expected:** All imported projects have `status = 'pending'` and a valid `created_by` FK.

### Equipment models

```sql
-- Count models
SELECT COUNT(*) FROM equipment_models WHERE legacy_id IS NOT NULL;

-- Verify Snipe-IT linking
SELECT COUNT(*) FROM equipment_models WHERE snipeit_model_id IS NOT NULL;
```

### Equipment assets

```sql
-- Count assets
SELECT COUNT(*) FROM equipment WHERE legacy_id IS NOT NULL;

-- Verify Snipe-IT linking
SELECT COUNT(*) FROM equipment WHERE snipeit_asset_id IS NOT NULL;

-- Check status distribution
SELECT status, COUNT(*) FROM equipment GROUP BY status;
```

**Expected:** All imported equipment has `status = 'available'`.

---

## Snipe-IT validation

Log in to the Snipe-IT interface and verify:

1. **Models** — Navigate to **Assets → Models**. Confirm that equipment models appear with correct names, categories, and manufacturers.

2. **Assets** — Navigate to **Assets → List All**. Confirm that individual assets appear with the correct model assignment, location, and `Available` status.

3. **Users** — Navigate to **Admin → Users**. Confirm that lab technician accounts have been created.

4. **Categories** — Navigate to **Settings → Categories**. Confirm that categories matching legacy equipment families have been created.

5. **Manufacturers** — Navigate to **Settings → Manufacturers**. Confirm that manufacturers matching legacy suppliers have been created.

---

## Cross-reference check

Verify that Snipe-IT IDs are correctly stored in PostgreSQL:

```sql
-- Models with no Snipe-IT ID (may indicate sync failures)
SELECT id, name, legacy_id FROM equipment_models 
WHERE snipeit_model_id IS NULL AND legacy_id IS NOT NULL;

-- Assets with no Snipe-IT ID
SELECT id, legacy_id FROM equipment 
WHERE snipeit_asset_id IS NULL AND legacy_id IS NOT NULL;
```

A small number of records without Snipe-IT IDs may be acceptable (e.g., items with blank Código were skipped). Investigate any unexpected gaps.

---

## Common migration issues

| Issue | Cause | Fix |
|---|---|---|
| User role is `student` but should be `lab_technician` | Email not in `LAB_TECHNICIANS` env | Add email and re-run or manually update |
| Project `created_by` is null or wrong | Owner user was not migrated | Run user migration first, then project migration |
| Asset appears in PostgreSQL but not in Snipe-IT | Snipe-IT API error during asset creation | Check migration logs; re-run equipment migration (idempotent) |
| Model created with wrong category | Family field was blank or unrecognized | Update in Snipe-IT manually or fix the dump extractor and re-run |
| `CHECK constraint violation` error | A value outside the allowed set was attempted | Review normalization rules; check the migration logs for the offending record |
| Equipment with blank Código was logged as skipped | Expected behavior | Review skipped items in the migration log; update manually if needed |
