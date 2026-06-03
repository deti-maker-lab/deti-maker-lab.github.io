---
sidebar_position: 1
title: Status Reference
description: All status values for projects, equipment, requisitions, and usage records.
---

# Status Reference

## Project statuses

| Status | Description |
|---|---|
| `pending` | Project has been created and is awaiting activation or technician review |
| `active` | Project is approved and operational; can submit equipment requisitions |
| `rejected` | Project was rejected; no requisitions can be submitted |
| `completed` | Project has concluded normally |
| `archived` | Project is archived for historical record-keeping |

**Transition rules:**
```
pending → active       (technician approves)
pending → rejected     (technician rejects)
active  → completed    (project concluded)
active  → archived     (project archived)
completed → archived   (optional)
```

---

## Equipment statuses

| Status | Description |
|---|---|
| `available` | The asset is in the lab and can be requested |
| `reserved` | The asset has been approved for a requisition in Snipe-IT |
| `checked_out` | The asset is currently with a project team |
| `maintenance` | The asset is undergoing maintenance and is not available |
| `retired` | The asset has been decommissioned |

**Schema constraint:**
```sql
CHECK (status IN ('available', 'reserved', 'checked_out', 'maintenance', 'retired'))
```

---

## Equipment condition values

| Condition | Description |
|---|---|
| `new` | Brand new, never used |
| `good` | Used but in good condition |
| `fair` | Shows wear but functional |
| `damaged` | Has damage; may affect function |
| `unusable` | Not usable; needs repair or disposal |

**Schema constraint:**
```sql
CHECK (condition IN ('new', 'good', 'fair', 'damaged', 'unusable'))
```

---

## Requisition (equipment_request) statuses

| Status | Description |
|---|---|
| `pending` | Submitted by student; awaiting technician review |
| `reserved` | Approved by technician; asset reserved in Snipe-IT |
| `rejected` | Rejected by technician; rejection reason stored |
| `checked_out` | Asset has been physically checked out (detected from Snipe-IT) |
| `returned` | Asset has been returned and checked in to Snipe-IT |

**Transition rules:**
```
pending  → reserved    (technician approves; Snipe-IT asset status updated)
pending  → rejected    (technician rejects with reason)
reserved → checked_out (detected from Snipe-IT activity log)
checked_out → returned (detected from Snipe-IT check-in activity)
```

---

## Equipment usage statuses

| Status | Description |
|---|---|
| `checked_out` | Equipment is currently checked out |
| `returned` | Equipment has been returned |
| `overdue` | Equipment was not returned by the due date |
| `lost` | Equipment reported as lost |

---

## Status history entity types

The `status_history` table records transitions for the following entity types:

| Entity type | Description |
|---|---|
| `project` | Project status changes |
| `equipment_request` | Requisition status transitions |
| `equipment_usage` | Usage record transitions |
| `equipment` | Physical asset status changes |

---

## Notification types

| Type | When used |
|---|---|
| `info` | General information |
| `warning` | Alert requiring attention |
| `request` | New requisition submitted |
| `approval` | Requisition approved |
| `return` | Equipment return detected |
| `reminder` | Overdue or reminder messages |

---

## User roles

| Role | Description |
|---|---|
| `student` | Default role for university users |
| `professor` | Faculty/professor role |
| `lab_technician` | Lab technician with full inventory and approval access |

## Project member roles

| Role | Description |
|---|---|
| `leader` | Project creator or designated lead |
| `member` | Regular project participant |
| `observer` | Read-only access |
| `advisor` | Advisor or mentor |
| `supervisor` | Supervisor or professor oversight |
