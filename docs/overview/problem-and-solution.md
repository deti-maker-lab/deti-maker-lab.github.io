---
sidebar_position: 1
title: Problem and Solution
description: Why the Wiki-based workflow was insufficient and what the new system provides.
---

# Problem and Solution

## The legacy workflow

DETI Maker Lab previously relied on a MediaWiki installation as its primary operational tool. Over time, several structural problems emerged:

### Project creation was unstructured
Projects were created as hand-written wiki pages. There was no validation, no required fields, and no consistent format. New students often created pages incorrectly. Searching and filtering projects was effectively impossible.

### Requisitions were manual and opaque
Equipment requests were made informally — via email, chat, or verbal communication. There was no central request record, no status tracking, and no structured approval step. Technicians had no dedicated view of pending requests.

### Equipment tracking was disconnected
Snipe-IT was used to track physical inventory, but it was managed independently from the project and requisition data. Connecting a project to specific equipment, tracking which equipment was currently with which student group, and understanding return history required cross-referencing multiple systems manually.

### Data was inconsistent and hard to maintain
The wiki accumulated stale pages, duplicates, and orphaned entries. Equipment articles used different formats and naming conventions. Cleaning and migrating this data required significant manual effort.

### No role-based access to inventory management
Any user could navigate to the Snipe-IT dashboard. There was no programmatic enforcement of technician-only access to inventory operations.

---

## Why a new system

The core insight is that **projects and project groups should be the central organizing entity**, not wiki pages.

A project-centred model allows:

- structured project creation with validated forms,
- requisitions attached to specific projects and traceable to their outcome,
- technician-facing approval workflows with clear status transitions,
- integration between the project record and the inventory system (Snipe-IT),
- role-based access — students request, technicians approve and manage,
- a mobile-accessible interface for quick status checks.

---

## What the new system provides

| Problem | Solution |
|---|---|
| Unstructured project pages | Structured project creation forms with validation |
| Informal requisitions | Formal requisition records with full lifecycle tracking |
| Disconnected inventory | Snipe-IT integration — reservation, checkout, and check-in are detected automatically |
| No approval flow | Dedicated technician dashboard with approve/reject actions |
| No role enforcement | SSO-based role assignment; technician-only Snipe-IT proxy access |
| Scattered history | Status history table and in-app notifications |
| No mobile access | Expo/React Native mobile app |
| Legacy data loss risk | Python migration CLI for importing legacy Wiki data |

---

## What is preserved

The system is designed to coexist with the existing installed base:

- **Snipe-IT** remains the authoritative inventory management system. The new system does not replace it — it integrates with it.
- **Legacy data** from the wiki can be imported using the migration tool. Existing project and equipment records are not discarded.
- **University SSO** is used as the authentication source. No separate credential system is created.

:::info
The migration tool enables importing legacy users, projects, and equipment from a PostgreSQL dump of the old wiki database. See the [Migration](../migration/overview.md) section for details.
:::
