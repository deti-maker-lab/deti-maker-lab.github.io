---
title: Requisition Workflow
sidebar_position: 3
---

# Requisition Workflow

## Overview

The requisition workflow is the core business process of the system.

Its main purpose is to let project groups request equipment repeatedly throughout the project lifecycle while preserving:

- approval control;
- inventory consistency;
- assignment traceability;
- return accountability.

## Baseline workflow stages

### 1. Authentication

The user authenticates with the university account.

### 2. Project context

The user creates a project or joins an existing one. All further equipment activity is anchored to this context.

### 3. Availability lookup

The application retrieves inventory information from Snipe-IT and presents what can be requested.

### 4. Requisition submission

The project submits a request containing one or more requested equipment models and quantities.

### 5. Review and decision

The lab technician reviews the request and either:

- approves it; or
- rejects it, optionally with a rejection reason.

### 6. Assignment

Once approved, the technician assigns concrete equipment assets to fulfill the request.

### 7. Active usage

The project can track the status of the request and the equipment currently associated with it.

### 8. Return

When equipment is returned, usage records are closed and the inventory state is reconciled.

## Why this workflow matters

This workflow fixes a core limitation of the legacy approach: requisitions must be **repeatable**, **project-linked**, and **auditable**.

## Data produced by the workflow

The workflow creates or updates the following categories of data:

- request header record;
- request item records;
- assignment / usage records;
- status history entries;
- notifications;
- inventory synchronization events.

## Recommended status model

The exact implementation may evolve, but the current documentation assumes statuses similar to:

- `pending`
- `approved`
- `rejected`
- `assigned`
- `returned`
- `closed`

## Design rule

Every state transition should be explicit, attributable to a user or system action, and eligible for historical review.
