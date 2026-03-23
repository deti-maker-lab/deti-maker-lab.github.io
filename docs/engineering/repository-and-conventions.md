---
title: Repository and Conventions
sidebar_position: 2
---

# Repository and Conventions

## Documentation goal

This page defines a recommended repository-level structure and documentation convention set for the project.

## Recommended repository split

The exact repository layout can evolve, but the project currently benefits from a clear separation of concerns such as:

- `frontend/` for the web client;
- `backend/` for FastAPI services;
- `mobile/` for React Native applications;
- `docs/` for Docusaurus documentation;
- `infra/` or `deploy/` for deployment-related assets;
- `scripts/` for utilities and migration helpers.

## Naming conventions

Recommended baseline conventions:

- English for code, architecture, and documentation terms;
- singular or plural naming kept consistent across the database and API;
- status names defined once and reused across backend and frontend;
- explicit integration naming for external IDs, for example `snipeit_asset_id`.

## Documentation conventions

### Keep "current" and "planned" separate

When a feature is not fully implemented yet, document it as:

- current baseline;
- planned extension; or
- open item.

### Avoid undocumented implicit behavior

If a status transition, sync job, or access rule exists, it should be written down somewhere in the docs.

### Use stable URLs and filenames

Prefer filenames that will remain valid across milestones even if content expands.

## Architecture decision record habit

A lightweight practice recommended for future milestones is to record major decisions in a small ADR-style format:

- context
- decision
- consequences

This is especially useful for topics such as authentication integration, migration strategy, and synchronization behavior.
