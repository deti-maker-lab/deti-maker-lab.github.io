---
title: Development Workflow
sidebar_position: 1
---

# Development Workflow

## Methodology

The project follows **OpenUP** as its development methodology.

This is appropriate for the project because it supports:

- iterative progress;
- milestone-based evolution;
- early architectural baselining;
- risk reduction during elaboration.

## Team workflow baseline

The current engineering workflow is centered around:

- source code in GitHub;
- task tracking in GitHub Projects;
- shared notes in Google Docs;
- day-to-day communication through Slack and WhatsApp;
- milestone-driven delivery.

## Branching and review recommendation

A simple and maintainable workflow is recommended:

- `main` always kept in a working state;
- feature branches for isolated work;
- pull requests for review and integration;
- no direct production changes outside version control.

## Definition of done - recommended baseline

A work item should normally be considered done only when:

- implementation exists;
- code is reviewed when feasible;
- it does not break the current baseline;
- documentation is updated if behavior changed.

## Documentation as engineering output

Documentation should evolve alongside the system, not after it. For this reason, every major architectural or operational decision should eventually be reflected in this site.

## Current emphasis

At this stage, the most important engineering concern is **integration confidence**:

- frontend ↔ backend
- backend ↔ PostgreSQL
- backend ↔ Snipe-IT
- authentication flow viability
