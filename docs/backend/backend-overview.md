---
title: Backend Overview
sidebar_position: 1
---

# Backend Overview

## Role of the backend

The backend is the **coordination layer** of the system. It is responsible for turning user actions into validated business operations.

Its responsibilities include:

- user session and identity integration;
- project creation and membership management;
- requisition workflow orchestration;
- database persistence;
- Snipe-IT integration;
- audit trail creation;
- authorization enforcement.

## Technology baseline

The current technology direction uses:

- **FastAPI** as the API framework;
- **SQLModel / SQLAlchemy-based persistence** for database interaction;
- **PostgreSQL** for application-domain persistence.

## Why this backend shape is appropriate

This project needs a backend that is:

- API-first;
- suitable for both web and mobile clients;
- easy to validate and document;
- practical for integration with external services.

FastAPI is well suited to this style because it supports strongly typed request/response definitions and automatic API documentation.

## Logical backend layers

A clean backend structure should separate:

### API layer

Responsible for request parsing, response models, and route definitions.

### Service layer

Responsible for workflow and business rules, such as:

- validating project membership;
- deciding if a request can move to the next status;
- coordinating assignment and return operations.

### Integration layer

Responsible for external service communication, especially:

- Snipe-IT API access;
- authentication-provider interaction.

### Persistence layer

Responsible for repositories, ORM models, and transactions.

## Design recommendation

Do not place business rules directly in route handlers. Route handlers should stay thin and delegate to service logic.

## Typical backend responsibilities by use case

| Use case | Backend responsibilities |
|---|---|
| Create project | validate input, create records, assign creator, set initial status |
| Submit requisition | validate project context, create request header and items |
| Approve request | authorize technician action, update status, record history |
| Assign equipment | reconcile request items with available inventory assets |
| Return equipment | close usage records, update state, preserve history |
