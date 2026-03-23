---
title: Authentication and Roles
sidebar_position: 2
---

# Authentication and Roles

## Authentication model

Authentication is delegated to the **university identity provider**. The Maker Lab platform should not manage local academic credentials itself.

This design supports:

- centralized identity management;
- institutional account reuse;
- reduced password-handling complexity in the application layer;
- alignment with university security policy.

## Authorization model

Authentication alone is not enough. The platform must also enforce **role-based authorization**.

### Current baseline roles

| Role | Responsibilities |
|---|---|
| Student | Create or join projects, submit requisitions, track status, return equipment |
| Lab technician | Review projects if required, approve or reject requisitions, assign equipment, receive returns, operate inventory workflows |
| Supervisor | Review project progress and associated activity with read-oriented visibility |

## Recommended authorization rules

### Student

A student should be able to:

- create a project proposal or join an existing project;
- view project-related requisitions they are allowed to see;
- request equipment under the scope of a project;
- monitor requisition status;
- participate in the return workflow.

A student should **not** be able to:

- directly approve requisitions;
- modify inventory authority data in place of the technician;
- bypass project membership constraints.

### Lab technician

A lab technician should be able to:

- review pending requests;
- approve or reject requisitions;
- assign physical equipment to approved requests;
- mark assets as returned;
- reconcile application state with inventory state.

### Supervisor

A supervisor should be able to:

- access project-level visibility;
- review progress and requisition history relevant to supervised projects.

A supervisor should generally **not** perform operational inventory actions.

## Role resolution

The exact way roles are derived can vary by implementation. The recommended current approach is:

1. authenticate through institutional identity;
2. create or update the local application user record;
3. assign application-level role metadata;
4. enforce authorization in backend endpoints and service logic.

## Security note

Authorization must always be enforced on the backend, even if the frontend hides unauthorized actions from the interface.
