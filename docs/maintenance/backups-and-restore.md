---
sidebar_position: 2
title: Backups and Restore
description: How to back up and restore PostgreSQL, MariaDB, and Snipe-IT data.
---

# Backups and Restore

## What needs to be backed up

| Data | Volume / Location | Criticality |
|---|---|---|
| MakerLab domain data | `makerlab_postgres` Docker volume | **Critical** |
| Snipe-IT database | `snipeit_db_data` Docker volume | **Critical** |
| Snipe-IT file storage | `snipeit_storage` Docker volume | High |
| Environment files | `apps/api/.env`, `infra/db/.env.postgres`, `infra/snipeit/.env.snipeit` | **Critical** |
| TLS certificates | `infra/nginx/certs/` | High |

---

## PostgreSQL backup

### Create a backup

```bash
# Backup to a SQL dump file
docker compose -f infra/docker/docker-compose.yml exec postgres \
  pg_dump -U makerlab -d makerlab -F c -f /tmp/makerlab_backup.dump

# Copy the file out of the container
docker cp makerlab-postgres:/tmp/makerlab_backup.dump ./backups/makerlab_$(date +%Y%m%d).dump
```

Or using `pg_dumpall` for all databases:

```bash
docker compose -f infra/docker/docker-compose.yml exec postgres \
  pg_dumpall -U makerlab > ./backups/makerlab_all_$(date +%Y%m%d).sql
```

### Restore PostgreSQL

```bash
# Stop the API to avoid writes during restore
docker compose -f infra/docker/docker-compose.yml stop api

# Restore from dump
docker cp ./backups/makerlab_YYYYMMDD.dump makerlab-postgres:/tmp/restore.dump
docker compose -f infra/docker/docker-compose.yml exec postgres \
  pg_restore -U makerlab -d makerlab -c /tmp/restore.dump

# Restart the API
docker compose -f infra/docker/docker-compose.yml start api
```

---

## MariaDB / Snipe-IT backup

### Create a backup

```bash
# Backup MariaDB
docker compose -f infra/docker/docker-compose.yml exec snipeit-db \
  mysqldump -u root -p<MYSQL_ROOT_PASSWORD> snipeit > ./backups/snipeit_$(date +%Y%m%d).sql
```

Replace `<MYSQL_ROOT_PASSWORD>` with the value from `infra/snipeit/.env.snipeit`.

### Restore MariaDB

```bash
docker cp ./backups/snipeit_YYYYMMDD.sql snipeit-db-container:/tmp/restore.sql
docker compose -f infra/docker/docker-compose.yml exec snipeit-db \
  mysql -u root -p<MYSQL_ROOT_PASSWORD> snipeit < /tmp/restore.sql
```

---

## Snipe-IT file storage

Snipe-IT stores uploaded files (images, documents) in the `snipeit_storage` Docker volume.

### Backup

```bash
# Find the volume path
docker volume inspect deti_maker_lab_snipeit_storage

# Or copy from container
docker run --rm -v snipeit_storage:/data -v $(pwd)/backups:/backup \
  alpine tar czf /backup/snipeit_storage_$(date +%Y%m%d).tar.gz -C /data .
```

### Restore

```bash
docker run --rm -v snipeit_storage:/data -v $(pwd)/backups:/backup \
  alpine tar xzf /backup/snipeit_storage_YYYYMMDD.tar.gz -C /data
```

---

## Environment file backups

Store the following files securely (not in version control):
- `apps/api/.env`
- `infra/db/.env.postgres`
- `infra/snipeit/.env.snipeit`
- `infra/nginx/certs/selfsigned.crt` (or real cert)
- `infra/nginx/certs/selfsigned.key` (or real key)

:::warning
These files contain secrets. Store backups in an encrypted location. Do not commit them to version control.
:::

---

## Backup schedule recommendations

| Backup type | Recommended frequency |
|---|---|
| PostgreSQL full backup | Daily |
| MariaDB full backup | Daily |
| Snipe-IT file storage | Weekly |
| Environment files | After any change |

Consider automating backups with a cron job or a backup tool (e.g., `restic`, `borgbackup`).

---

## Testing restores

Periodically test that your backups can be restored:

1. Spin up a separate test environment.
2. Restore a backup.
3. Verify that the application starts and data is accessible.
4. Verify that Snipe-IT loads and assets are visible.

A backup that has never been tested should not be trusted.
