---
title: PostgreSQL Setup on Ubuntu VM
sidebar_position: 2
---

# PostgreSQL Setup on Ubuntu VM

This page documents the recommended baseline for deploying the **Maker Lab application database** on an Ubuntu virtual machine.

## 1. Install PostgreSQL

Update the package index and install PostgreSQL:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

## 2. Confirm the service is running

```bash
sudo systemctl status postgresql
```

If needed:

```bash
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

## 3. Access the PostgreSQL administration shell

```bash
sudo -u postgres psql
```

## 4. Create a dedicated application role

Create a database role for the application instead of using the default administrative account:

```sql
CREATE ROLE makerlab_app WITH LOGIN PASSWORD 'change_me';
```

For a stricter model, create separate roles later for migrations, read-only access, or backups.

## 5. Create the application database

```sql
CREATE DATABASE makerlab OWNER makerlab_app;
```

Optional hardening:

```sql
REVOKE ALL ON DATABASE makerlab FROM PUBLIC;
GRANT ALL PRIVILEGES ON DATABASE makerlab TO makerlab_app;
```

## 6. Configure local or network access

### Local-only deployment

If the backend runs on the same VM, a local socket or `localhost` connection is usually enough.

### Remote backend access

If the backend connects remotely, adjust:

- `postgresql.conf`
- `pg_hba.conf`

Typical locations on Ubuntu:

```bash
/etc/postgresql/<version>/main/postgresql.conf
/etc/postgresql/<version>/main/pg_hba.conf
```

### Example `postgresql.conf` change

```conf
listen_addresses = 'localhost'
```

Use a specific private IP if remote connections are required. Do not expose PostgreSQL broadly without network controls.

### Example `pg_hba.conf` entry

```conf
host    makerlab    makerlab_app    10.0.0.0/24    scram-sha-256
```

After changes:

```bash
sudo systemctl restart postgresql
```

## 7. Test the connection

```bash
psql -h localhost -U makerlab_app -d makerlab
```

## 8. Use the application connection string

Example:

```env
DATABASE_URL=postgresql+psycopg://makerlab_app:change_me@localhost:5432/makerlab
```

## 9. Recommended production practices

- use a dedicated application role;
- use strong passwords or secret injection;
- restrict network access to trusted application hosts;
- keep the Maker Lab database separate from the Snipe-IT database;
- define a backup and restore procedure before production use.

## 10. Project-specific note

For this project, PostgreSQL is the persistence layer for:

- projects;
- users and memberships;
- requisitions;
- usage and assignment history;
- notifications and status changes.

It is **not** the source of truth for inventory availability. That role belongs to Snipe-IT.
