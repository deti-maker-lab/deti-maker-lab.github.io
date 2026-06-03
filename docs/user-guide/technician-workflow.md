---
sidebar_position: 5
title: Technician Workflow
description: How lab technicians review projects, approve or reject requisitions, and manage equipment.
---

# Technician Workflow

Lab technicians are the gatekeepers of the equipment lifecycle. This guide covers the day-to-day operations a technician performs in the MakerLab system.

---

## Accessing the technician tools

After logging in with your university SSO account, you will see additional navigation items:
- **Admin panel** — requisition review, user management.
- **Snipe-IT link** — direct access to the Snipe-IT inventory interface.

Your access to Snipe-IT is enforced at the proxy level — only users with the `lab_technician` role can access the Snipe-IT interface.

:::warning
If your role is not `lab_technician` and you need technician access, contact the system administrator to add your email to the `LAB_TECHNICIANS` environment variable.
:::

---

## Reviewing pending requisitions

1. Navigate to the **Admin** panel.
2. View the list of requisitions with `pending` status.
3. Click a requisition to see:
   - The project it belongs to.
   - The requesting user.
   - The specific asset requested (Snipe-IT asset ID, model, location).
   - When it was submitted.

---

## Approving a requisition

1. Open the requisition.
2. Verify the request makes sense (project is active, user is a member, asset is available).
3. Click **Approve**.

**What happens automatically:**
- The requisition status changes to `reserved`.
- The Snipe-IT asset status is updated to `Reserved` (via API call to Snipe-IT).
- The requesting user receives a notification.
- A `status_history` record is created.

---

## Rejecting a requisition

1. Open the requisition.
2. Click **Reject**.
3. Enter a reason for rejection (required).
4. Confirm.

**What happens automatically:**
- The requisition status changes to `rejected`.
- The reason is stored in the database.
- The requesting user receives a notification with the reason.

---

## Handing out equipment (checkout)

After approving a requisition:

1. The student comes to collect the equipment.
2. Open **Snipe-IT** from the sidebar link.
3. Find the asset by its asset tag or ID.
4. Click **Check Out** and assign it to the user.

**The MakerLab system detects the checkout automatically** by polling the Snipe-IT activity log. The requisition status will update to `checked_out` after the next sync. You can trigger the sync manually:

```
POST /api/requisitions/sync-snipeit
```

This is typically done by the system admin or as a scheduled task.

---

## Receiving returned equipment (check-in)

1. The student returns the equipment.
2. In **Snipe-IT**, find the asset and click **Check In**.
3. Confirm the check-in.

**The MakerLab system detects the return automatically** via the activity log sync. The requisition status will update to `returned`.

---

## Managing users

From the Admin panel, technicians can:
- View the list of registered users.
- See user roles.
- Manage user records if needed.

---

## Syncing the catalog

When new equipment is added to Snipe-IT (new models or assets), trigger a catalog sync to import the new items into the local database:

```
POST /api/equipment/catalog/sync
```

This can be called from the Swagger UI at `https://<domain>/api/docs` or from a REST client.

---

## Managing technician access

To grant or revoke technician access for a user, see [Security — Managing Lab Technicians](../maintenance/security.md#managing-lab-technicians).

---

## Snipe-IT status labels

The following status labels must be configured in Snipe-IT for the integration to work correctly:

| Label | Status type | Purpose |
|---|---|---|
| `Available` | Deployable | Default status for available assets |
| `Reserved` | Deployable | Set when a requisition is approved |
| `Checked Out` | Deployable | Managed by Snipe-IT checkout flow |

If these labels do not exist or have been renamed, contact the system administrator.
