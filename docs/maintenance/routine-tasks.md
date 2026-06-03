---
sidebar_position: 1
title: Routine Tasks
description: Regular maintenance tasks for the DETI Maker Lab system.
---

# Routine Tasks

## Equipment catalog sync

When new equipment is added to Snipe-IT, sync the local catalog:

```bash
# Via API (requires authentication with a technician account)
curl -X POST https://<domain>/api/equipment/catalog/sync \
  -H "Authorization: Bearer <JWT>"

# Via Swagger UI
# Navigate to /api/docs → POST /api/equipment/catalog/sync → Execute
```

**When to run:** After adding new equipment models or assets in Snipe-IT.

---

## Snipe-IT activity sync

To detect recent checkout and check-in events and update local requisition status:

```bash
curl -X POST https://<domain>/api/requisitions/sync-snipeit \
  -H "Authorization: Bearer <JWT>"
```

**When to run:** Periodically (consider scheduling this with a cron job), or manually when you notice requisition statuses are not updating.

---

## Monitor active requisitions

Check the Admin panel in the web application to view:
- Pending requisitions awaiting approval.
- Active (reserved or checked out) requisitions.
- Long-running requests that may be overdue.

There is no automated overdue alert yet — manual review is required. See [Future Work](./future-work.md).

---

## Check container health

```bash
# View container status
docker ps

# Check logs for specific service
docker logs makerlab-api --tail 100
docker logs makerlab-nginx --tail 50
docker logs makerlab-postgres --tail 50
```

**Signs of problems:**
- Container status shows "Restarting" repeatedly.
- HTTP 500 errors in API logs.
- PostgreSQL connection errors.
- Nginx configuration errors.

---

## Verify database connectivity

```bash
# API health check endpoint
curl https://<domain>/api/health-db
# Expected: {"status": "ok", "message": "Successfully connected to the PostgreSQL database!"}
```

---

## Update technician list

To add or remove a lab technician, edit `apps/api/.env`:

```env
LAB_TECHNICIANS=tech1@ua.pt,tech2@ua.pt
```

Then restart the API container:

```bash
docker compose -f infra/docker/docker-compose.yml up -d --build api
```

The change takes effect the next time the affected user logs in.

---

## Review logs

```bash
# All services
docker compose -f infra/docker/docker-compose.yml logs --tail 200

# Specific service
docker compose -f infra/docker/docker-compose.yml logs api --tail 200 -f
```

Logs are currently written to Docker's stdout/stderr. For persistent log storage, configure a log driver or aggregation system.

---

## Verify backups

Periodically test that backups can be restored. See [Backups and Restore](./backups-and-restore.md) for the procedure.

---

## Update the application

```bash
git pull
docker compose -f infra/docker/docker-compose.yml up -d --build
```

:::warning
After updating environment variables or any `NEXT_PUBLIC_*` variables, always rebuild: `--build` is required.
:::
