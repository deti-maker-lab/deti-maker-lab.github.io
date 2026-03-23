---
title: Data Model
sidebar_position: 3
---

# Data Model

## Overview

The current relational design links users, projects, requisitions, and equipment usage while preserving integration points with Snipe-IT.

## Main entities

### `users`

Represents authenticated application users.

Key fields:

- `id`
- `name`
- `email`
- `role`
- `nmec`
- `created_at`

### `projects`

Represents Maker Lab projects.

Key fields:

- `id`
- `name`
- `description`
- `course`
- `academic_year`
- `group_number`
- `created_by`
- `supervisor_id`
- `status`
- `tags`
- `links`
- `approved_at`
- `created_at`

### `project_members`

Associates users with projects and stores project-level membership role metadata.

### `equipment_models`

Represents equipment categories or models referenced by the application and mapped to Snipe-IT model identifiers.

Key integration fields:

- `snipeit_model_id`
- `last_synced_at`

### `equipment`

Represents specific equipment instances known to the application layer for mapping and traceability.

Key integration fields:

- `snipeit_asset_id`
- `status`
- `condition`
- `last_synced_at`

### `equipment_request`

Represents a requisition header linked to a project and submitting user.

Important fields:

- `status`
- `rejection_reason`
- `approved_at`
- `created_at`

### `equipment_request_items`

Stores the requested models and quantities inside one requisition.

### `equipment_usage`

Represents the actual assignment of a specific equipment asset to a project and request item.

Important fields:

- `checked_out_at`
- `due_at`
- `returned_at`
- `status`

### `status_history`

Generic audit trail for state transitions.

### `notifications`

System notifications sent to users in response to workflow events.

## Relationship summary

| Relationship | Meaning |
|---|---|
| user → projects (creator) | who created the project |
| user → projects (supervisor) | who supervises the project |
| project ↔ project_members ↔ user | who belongs to the project |
| project → equipment_request | which requests belong to the project |
| equipment_request → equipment_request_items | what was requested |
| equipment_usage → equipment | which concrete asset fulfilled the request |
| status_history → user | who changed the status |
| notifications → user | who receives notifications |

## Why this model works well for the project

The schema supports the most important project constraints:

- projects stay central in the business model;
- multiple requisitions per project are supported;
- supervisors are modeled as users;
- asset-level assignments are possible without duplicating full inventory authority;
- history and notifications are first-class entities.

## Notes on synchronization

The `snipeit_model_id` and `snipeit_asset_id` fields act as **cross-system references**. They should be treated as integration anchors rather than evidence that the Maker Lab database owns the inventory records.

## Raw ERD source

The original Mermaid ERD source used as a base for this documentation is available in:

- `docs/appendix/database-diagram-source.mmd`
