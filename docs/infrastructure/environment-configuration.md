---
title: Environment Configuration
sidebar_position: 2
---

# Environment Configuration

## Goal

This page documents the **recommended current environment configuration baseline**.

The exact variable names in the codebase may differ, but the following set describes the configuration concerns that the platform needs.

## Application configuration groups

### Application runtime

```env
APP_NAME=makerlab
APP_ENV=development
APP_HOST=0.0.0.0
APP_PORT=8000
APP_BASE_URL=https://makerlab.example.ua.pt
LOG_LEVEL=info
```

### PostgreSQL connectivity

```env
DATABASE_URL=postgresql+psycopg://makerlab_app:change_me@db-host:5432/makerlab
DATABASE_ECHO=false
```

### Snipe-IT integration

```env
SNIPEIT_URL=https://snipeit.example.ua.pt
SNIPEIT_API_TOKEN=replace_with_secure_token
SNIPEIT_TIMEOUT_SECONDS=15
```

### Authentication / identity provider

```env
SSO_ISSUER=https://identity.example.ua.pt
SSO_CLIENT_ID=makerlab-client
SSO_CLIENT_SECRET=replace_in_secret_store
SSO_REDIRECT_URI=https://makerlab.example.ua.pt/auth/callback
```

### CORS and client origins

```env
WEB_APP_URL=https://makerlab.example.ua.pt
MOBILE_APP_SCHEME=makerlab://auth/callback
ALLOWED_ORIGINS=https://makerlab.example.ua.pt
```

## Configuration rules

### Never commit secrets

Passwords, tokens, client secrets, and signing keys must never be committed to the repository.

### Separate by environment

Maintain independent values for:

- local development;
- shared development or staging;
- production.

### Keep secrets rotatable

API tokens and credentials should be replaceable without requiring code changes.

## Suggested file strategy

A practical structure is:

- `.env.example` committed to the repository;
- `.env` ignored locally;
- production secrets provided through environment injection or secret management.

## Operational note

Snipe-IT and application database credentials must be managed independently because they represent different security domains.
