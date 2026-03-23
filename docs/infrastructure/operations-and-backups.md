---
title: Operations and Backups
sidebar_position: 3
---

# Operations and Backups

## Operational baseline

Even at an early project stage, the following operational practices should exist:

- reproducible service startup;
- database backup procedure;
- log access for troubleshooting;
- environment-specific configuration separation;
- defined ownership of deployment credentials.

## Database backup strategy

The PostgreSQL database stores project-domain data and history. It should be backed up regularly even if the project is still in active development.

### Recommended baseline

- daily logical backup with `pg_dump`;
- retention of multiple backup generations;
- a restore test performed periodically;
- backups stored outside the main VM when possible.

### Example backup command

```bash
pg_dump -U makerlab_app -h localhost -d makerlab -F c -f makerlab_$(date +%F).dump
```

### Example restore command

```bash
pg_restore -U makerlab_app -h localhost -d makerlab_restored --clean --if-exists makerlab_2026-03-21.dump
```

## Snipe-IT operational note

Because Snipe-IT is a separate system, its database and file-level operational procedures should be documented separately from the Maker Lab application database procedures.

## Logging

At minimum, retain access to:

- reverse proxy logs;
- application server logs;
- database service logs.

## Monitoring priorities

For the next stages of the project, prioritize visibility over:

- application startup and failure events;
- database connectivity;
- Snipe-IT API availability;
- authentication failures;
- background synchronization or migration jobs.

## Recovery note

Backups are only useful if restore procedures are tested. A restore drill should be part of the operational checklist before production use.
