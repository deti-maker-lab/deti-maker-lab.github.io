---
sidebar_position: 2
title: Running the Migration
description: How to configure and run the migration CLI tool.
---

# Running the Migration

## Configuration

Create or update `apps/migration/.env` with:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection URL (same as API) |
| `SNIPEIT_BASE_URL` | Internal or public Snipe-IT URL |
| `SNIPEIT_API_TOKEN` | Snipe-IT personal access token |

---

## CLI reference

```
python apps/migration/makerlab_migrate/cli.py [OPTIONS]
```

| Option | Default | Description |
|---|---|---|
| `--dump-path PATH` | _(required)_ | Path to the legacy wiki PostgreSQL dump directory |
| `--dry-run` | `false` | Preview all operations without writing |
| `--entity` | `all` | Which entities to migrate: `users`, `projects`, `equipment`, or `all` |
| `--limit N` | _(none)_ | Limit the number of records per entity (useful for testing) |
| `--since-legacy-id X` | _(none)_ | Start from a specific legacy ID (manual incremental) |
| `--incremental` | `false` | Use checkpoint tracking for automatic incremental runs |
| `--batch-size N` | `100` | Records per batch (for Snipe-IT rate limiting) |
| `--skip-snipeit` | `false` | Migrate to PostgreSQL only, skip Snipe-IT |
| `--validate-only` | `false` | Parse and validate the dump without any DB operations |

---

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | Configuration error (missing env vars or invalid paths) |
| `2` | Database connection error |
| `3` | Snipe-IT API error |
| `4` | Dump parsing error |
| `5` | Validation error (schema constraints would be violated) |

---

## Recommended migration order

### Step 1: Validate the dump

```bash
python apps/migration/makerlab_migrate/cli.py \
  --dump-path /path/to/dump-1776931288 \
  --validate-only
```

Parses the dump and reports any issues (missing fields, invalid values) without writing anything.

### Step 2: Test with a small batch (PostgreSQL only)

```bash
python apps/migration/makerlab_migrate/cli.py \
  --dump-path /path/to/dump-1776931288 \
  --skip-snipeit \
  --limit 10
```

Tests the user and project migration with 10 records, skipping Snipe-IT.

### Step 3: Full dry-run

```bash
python apps/migration/makerlab_migrate/cli.py \
  --dump-path /path/to/dump-1776931288 \
  --dry-run
```

Simulates the complete migration (including Snipe-IT calls) without writing any data.

### Step 4: Migrate users only

```bash
python apps/migration/makerlab_migrate/cli.py \
  --dump-path /path/to/dump-1776931288 \
  --entity users
```

### Step 5: Migrate projects

```bash
python apps/migration/makerlab_migrate/cli.py \
  --dump-path /path/to/dump-1776931288 \
  --entity projects
```

Projects require users to exist first (FK dependency).

### Step 6: Migrate equipment

```bash
python apps/migration/makerlab_migrate/cli.py \
  --dump-path /path/to/dump-1776931288 \
  --entity equipment
```

Equipment migration is self-contained.

### Step 7: Full migration (all entities)

```bash
python apps/migration/makerlab_migrate/cli.py \
  --dump-path /path/to/dump-1776931288
```

Runs all phases in order: users → projects → equipment.

---

## Expected output

The migration tool logs structured JSON-like output to stdout:

```
{"entity": "user", "legacy_id": 42, "action": "INSERT", ...}
{"entity": "project", "legacy_id": 7, "action": "UPDATE", ...}
...
Phase 1 (Users) complete: 150 users
Phase 2 (Projects) complete: 48 projects, 92 members
Phase 3 (Equipment) complete: 35 models, 120 assets
```

At the end, summary counts are printed for inserted, updated, and skipped records.

---

## Rollback

The migration is idempotent — re-running after a failure is safe. Records are upserted, not duplicated.

If data corruption is suspected:
- Restore PostgreSQL from a pre-migration backup.
- Wipe and re-initialize Snipe-IT assets by resetting the `snipeit_db_data` volume.
- Re-run the migration.

The `legacy_id` columns in PostgreSQL allow selective deletion of migrated records if needed.
