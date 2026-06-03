---
sidebar_position: 4
title: Requisitions
description: How to submit equipment requests, track status, and return equipment.
---

# Requisitions

A requisition is a formal request to borrow one or more pieces of equipment for your project.

---

## Submitting a requisition

**Prerequisites:**
- You must be a member of an active project.
- The equipment you want must have `available` status.

**Steps:**

1. Navigate to **Equipment** and browse the catalog.
2. Select the specific physical asset(s) you want to request.
3. Click **Request** (or equivalent button).
4. Select the project the equipment is for.
5. Confirm and submit.

A requisition record is created with status `pending`. The lab technician will be notified.

:::info
You can submit multiple requisitions for the same project at different times. Each requisition tracks its own lifecycle independently.
:::

---

## Tracking requisition status

Navigate to **Ledger** to see all your requisitions and their current status.

Each requisition shows:
- The equipment requested.
- The project it belongs to.
- Current status.
- Timestamps (submitted, approved, checked out, returned).
- Rejection reason (if rejected).

---

## Requisition statuses

| Status | What it means |
|---|---|
| `pending` | Submitted. Waiting for the lab technician to review. |
| `reserved` | Approved. The asset has been reserved in Snipe-IT. Waiting for physical checkout. |
| `rejected` | The request was declined. A reason should be provided. |
| `checked_out` | The asset has been physically handed to you. |
| `returned` | You have returned the asset. The technician has checked it back in to Snipe-IT. |

---

## What happens after approval

1. You receive a notification that your request was approved.
2. The asset status in Snipe-IT is set to `Reserved`.
3. Visit the lab to collect the equipment.
4. The technician checks the asset out to you in Snipe-IT.
5. Your requisition status updates to `checked_out` (automatically detected from Snipe-IT activity).

---

## Returning equipment

1. Physically return the equipment to the lab technician.
2. The technician checks the asset back in to Snipe-IT.
3. Your requisition status updates to `returned` (automatically detected).

You do not need to take any action in the application to mark equipment as returned — the system detects this from Snipe-IT.

---

## If your request is rejected

- You receive a notification with the rejection reason.
- You can view the reason in the **Ledger** page.
- You can submit a new request after addressing the issue if appropriate.

---

## Notifications

You receive in-app notifications for:
- Requisition approved.
- Requisition rejected (with reason).
- Equipment checked out.
- Equipment returned.

Check the notification bell icon in the navigation bar.
