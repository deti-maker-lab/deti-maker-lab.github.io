---
title: Database Overview
sidebar_position: 1
---

# Database Overview

## Design purpose

The PostgreSQL database stores the **Maker Lab application domain**, not the inventory authority.

This distinction is essential:

- the Maker Lab database stores project logic and traceability;
- Snipe-IT stores inventory and asset authority.

## What belongs in PostgreSQL

The current schema is designed to keep the following data in PostgreSQL:

- users and their application roles;
- projects and project membership;
- project supervisors;
- equipment requests and request items;
- equipment usage assignments;
- status history and notifications.

## What does not belong here

The following should remain externalized to Snipe-IT:

- asset inventory authority;
- stock and availability truth;
- equipment master details that are owned by the inventory platform.

The local schema can cache or map selected inventory identifiers for integration purposes, but it should not attempt to replace Snipe-IT.

## Design characteristics

The current design favors:

- explicit relationships between projects, users, and requisitions;
- support for multiple requisitions over one project lifecycle;
- asset-level assignment records;
- auditability through status history;
- loose coupling to external inventory through Snipe-IT identifiers.

## Entity groups

### Identity and project structure

- `users`
- `projects`
- `project_members`

### Inventory mapping

- `equipment_models`
- `equipment`

### Requisition workflow

- `equipment_request`
- `equipment_request_items`
- `equipment_usage`

### Audit and communication

- `status_history`
- `notifications`

## Database diagram
![Image shows database diagram of the system](../../static/img/architecture/database-diagram.png "Database diagram")
