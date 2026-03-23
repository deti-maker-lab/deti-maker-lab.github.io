---
title: System Overview
sidebar_position: 1
---

# System Overview

## Architectural principles

The current system architecture follows five core principles:

1. **Separation of concerns**  
   Inventory, application workflow, authentication, and legacy migration are treated as separate concerns.

2. **Reuse before rebuild**  
   Mature tools are reused where appropriate instead of reimplementing them.

3. **Project-centric workflow**  
   Requisitions are always anchored in a project context.

4. **Traceability**  
   Requests, assignments, returns, and status changes must remain auditable.

5. **Incremental replacement of the installed base**  
   Legacy value is preserved through migration and reuse of domain knowledge.

## Logical component model

The current baseline consists of the following logical components:

| Component | Responsibility |
|---|---|
| Web client | Browser-based access for students, supervisors, and lab technician |
| Mobile clients | Android and iOS access for project-oriented workflows |
| Reverse proxy | Entry point, request routing, and boundary protection |
| Application server | Business rules, requisition workflow, project management, integrations |
| PostgreSQL database | Persistent storage for application-domain data |
| Snipe-IT | Inventory authority for assets and equipment availability |
| University SSO | User authentication |
| Migration module | Legacy data import from previous system |

## Main communication paths

The most important communication paths in the system are:

- client → reverse proxy
- reverse proxy → application server
- application server → PostgreSQL
- application server → Snipe-IT REST API
- application server → authentication service
- migration module → legacy data source during migration windows

## Why the architecture is split this way

The strongest architectural decision is the split between:

- **inventory management**, handled by Snipe-IT;
- **project workflow and traceability**, handled by the Maker Lab application.

This avoids duplicating inventory logic while still allowing the project to implement its own domain workflow, approvals, history, and reporting.

## Baseline diagram

The current deployment-oriented architecture is illustrated below.

![Deployment diagram](/img/architecture/deployment-diagram.jpeg)
