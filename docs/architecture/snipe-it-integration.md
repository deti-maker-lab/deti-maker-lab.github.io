---
sidebar_position: 5
title: Snipe-IT Integration
description: How the MakerLab integrates with Snipe-IT as the authoritative inventory system.
---

# Snipe-IT Integration

## Roles in the integration

The integration follows a **unidirectional authority model**:

| System | Authority for |
|---|---|
| **Snipe-IT** | Physical assets (models, assets, locations, checkout/check-in) |
| **MakerLab API** | Projects, requisitions, assignments, user roles, status history |

The MakerLab does not attempt to replicate or replace Snipe-IT. It reads asset state from Snipe-IT and writes reservation status changes back to it.

---

## Configuration

The API connects to Snipe-IT using two environment variables:

```env
# Internal Docker network URL (never browser-facing)
SNIPEIT_BASE_URL=http://snipeit

# API token generated from the Snipe-IT admin interface
SNIPEIT_API_TOKEN=eyJ0eXAiOiJKV1QiLCJhbG...

# Public browser-facing Snipe-IT URL (used for sidebar links and redirect)
SNIPEIT_PUBLIC_URL=https://deti-makerlab.ua.pt/new/snipe-it

# Snipe-IT status label ID for "Reserved" status
SNIPEIT_RESERVED_STATUS_ID=4
```

:::tip
The `SNIPEIT_BASE_URL` uses the Docker internal service name `snipeit` — it is not accessible from outside the Docker network. This is the URL used for backend-to-Snipe-IT API calls only.
:::

---

## Initial setup

Snipe-IT requires one-time initialization on first deployment. The automated bootstrap script handles this:

```bash
./infra/docker/bootstrap-snipeit.sh
```

The script:
1. Waits for Snipe-IT to fully initialize.
2. Creates the first admin user.
3. Registers the personal access client.
4. Generates an API token.
5. Writes the token to `apps/api/.env`.
6. Restarts the API container.

If the script fails, the Snipe-IT API token can be generated manually through the Snipe-IT web interface. See `core/docs/SNIPEIT.md` for the manual procedure.

---

## Snipe-IT status labels

Before the system can operate, the following status labels must be configured in Snipe-IT (**Settings → Status Labels**):

| Label name | Status type | Notes |
|---|---|---|
| `Available` | Deployable | Rename from the default "Ready to Deploy" |
| `Reserved` | Deployable | Create new; note the numeric ID for `SNIPEIT_RESERVED_STATUS_ID` |
| `Checked Out` | Deployable | Create new |

---

## Catalog sync

Equipment models are synced from Snipe-IT into the local `equipment_models` table on demand:

```
POST /api/equipment/catalog/sync
```

This endpoint queries `/api/v1/models` from Snipe-IT and upserts local `EquipmentModel` records. It also queries assets and populates the `equipment` table.

Equipment catalog data displayed to users comes from the local database (fast, no Snipe-IT round-trip required per page load).

---

## Reservation flow (approval)

When a technician approves a requisition:

1. The local `equipment_request` status moves to `reserved`.
2. The API calls Snipe-IT's asset update endpoint to set the asset's status label to `Reserved` (identified by `SNIPEIT_RESERVED_STATUS_ID`).
3. A notification is sent to project members.

```
PATCH /api/v1/hardware/{snipeit_asset_id}
Body: { "status_id": SNIPEIT_RESERVED_STATUS_ID }
```

---

## Checkout and check-in detection (activity log polling)

Physical checkout and check-in are performed by the technician directly in the Snipe-IT interface. The MakerLab detects these events by polling the Snipe-IT activity log:

```
POST /api/requisitions/sync-snipeit
```

This endpoint:
1. Fetches the latest activity log from Snipe-IT (up to 200 entries via `/api/v1/reports/activity`).
2. For each `checkout` action: if the asset corresponds to a local request in `reserved` status, updates the request to `checked_out` and records `checked_out_at`.
3. For each `checkin from` action: if the asset corresponds to a local request in `checked_out` status, updates the request to `returned` and records `returned_at`.
4. Records all transitions in `status_history`.

---

## Technician provisioning in Snipe-IT

When a `lab_technician` user accesses Snipe-IT for the first time, the API auto-provisions them as a Snipe-IT admin user:

```python
# auth/router.py → /auth/snipeit/verify
_create_snipeit_user(user.name, user.email)
```

This ensures every verified technician has a corresponding Snipe-IT account and can perform checkout operations in the Snipe-IT interface.

---

## ID mapping

| MakerLab entity | Snipe-IT reference |
|---|---|
| `equipment_models.snipeit_model_id` | Snipe-IT model ID |
| `equipment.snipeit_asset_id` | Snipe-IT asset ID |
| `equipment_request.snipeit_asset_id` | Snipe-IT asset ID being requested |

These foreign references allow the API to look up and update specific Snipe-IT records without maintaining a full local copy of Snipe-IT data.

---

## Limitations

- **Polling, not webhooks.** Checkout and check-in detection depend on polling the Snipe-IT activity log. There is no real-time push mechanism. Run `sync-snipeit` periodically or on demand.
- **Status label IDs are environment-specific.** The `SNIPEIT_RESERVED_STATUS_ID` must be set to match the actual numeric ID in the deployed Snipe-IT instance.
- **Snipe-IT is not automatically backed up** by the MakerLab. Snipe-IT's MariaDB data requires a separate backup. See [Backups and Restore](../maintenance/backups-and-restore.md).
- **SSL verification.** When using the public Snipe-IT URL from external scripts (outside Docker), SSL verification may need to be disabled if self-signed certificates are in use. Inside Docker, the internal `http://snipeit` URL is used and does not require SSL.
