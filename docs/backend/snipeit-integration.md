---
title: Snipe-IT Integration
sidebar_position: 2
---

# Snipe-IT Integration

## Integration goal

Snipe-IT is used as the **authoritative inventory platform**. The Maker Lab backend integrates with it instead of implementing a second inventory system.

## What the integration is expected to do

The backend should use Snipe-IT to:

- query equipment models and asset availability;
- obtain asset metadata needed for requisition decisions;
- support assignment and return workflows;
- keep the user-facing workflow aligned with real inventory state.

## What should stay in the Maker Lab backend

The backend still owns:

- projects;
- project memberships;
- requisition business rules;
- status history;
- notifications;
- project-level reporting.

## Integration model

The recommended model is:

1. the backend receives a project-domain request;
2. it validates business rules in the Maker Lab database;
3. it queries or updates Snipe-IT when inventory information is needed;
4. it persists workflow state locally;
5. it records history and produces user-facing status updates.

## Cross-system identifiers

The schema already anticipates integration with the following mapping fields:

- `equipment_models.snipeit_model_id`
- `equipment.snipeit_asset_id`

These fields let the backend connect local workflow records to inventory records managed externally.

## Practical design rules

### Do not duplicate full inventory logic

The Maker Lab system should not attempt to become a second stock-management system.

### Cache only what improves workflow

A local mapping table is acceptable when it improves performance, traceability, or data joins, but the source of truth must remain external.

### Treat synchronization errors explicitly

If Snipe-IT is temporarily unavailable, the backend should fail in a controlled way and avoid committing misleading workflow state.

## Security and credentials

Snipe-IT API credentials must be stored securely and injected through environment configuration.

## Recommended future extensions

As the project evolves, this integration page can be extended with:

- endpoint-level contract details;
- synchronization strategies;
- retry and timeout rules;
- mapping examples;
- failure-mode documentation.
