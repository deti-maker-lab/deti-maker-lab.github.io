---
sidebar_position: 3
title: Equipment Catalog
description: How to browse, search, and understand equipment availability.
---

# Equipment Catalog

The equipment catalog lists all physical assets managed by the DETI Maker Lab. The catalog is synchronized from Snipe-IT and reflects the current availability status of each item.

---

## Browsing the catalog

Navigate to **Equipment** in the navigation bar.

You will see a list of available assets with their:
- Name and model.
- Category / family.
- Location.
- Availability status.

---

## Filtering and searching

You can filter the catalog by:
- **Status** — available, reserved, checked out, in maintenance.
- **Category / family** — e.g., electronics, mechanical, materials.
- **Search term** — partial matches on name, model, or reference code.

---

## Understanding asset status

| Status | Meaning |
|---|---|
| `available` | The asset is in the lab and can be requested |
| `reserved` | The asset has been approved for a project but not yet checked out |
| `checked_out` | The asset is currently with a project team |
| `maintenance` | The asset is undergoing maintenance and cannot be requested |
| `retired` | The asset is no longer available |

---

## Requesting equipment

From the equipment catalog, you can select specific assets to request. You will need to:

1. Have an active project (see [Projects](./projects.md)).
2. Select the assets you want.
3. Submit a requisition request.

The requisition process is described in detail in [Requisitions](./requisitions.md).

---

## Catalog updates

The catalog is synced from Snipe-IT by a lab technician or system administrator when new equipment is added or removed. The sync is not automatic on every page load — data is served from the local database cache.

If you believe the catalog is outdated, contact your lab technician to trigger a sync.
