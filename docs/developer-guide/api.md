---
sidebar_position: 2
title: API Reference
description: FastAPI backend endpoint summary organized by router area.
---

# API Reference

The backend is a **FastAPI** application. Interactive Swagger documentation is available at:

- **Development:** `http://localhost:8000/docs`
- **Production:** `https://<domain>/api/docs`

All routes are prefixed at `/api/*` when accessed through Nginx.

---

## Auth endpoints (`/auth`)

| Method | Path | Description |
|---|---|---|
| `GET` | `/auth/sso/login` | Initiate SSO login (web) |
| `GET` | `/auth/sso/login/mobile` | Initiate SSO login (mobile / Snipe-IT redirect) |
| `GET` | `/auth/sso/callback` | OAuth1 callback (universal — web and mobile deep link) |
| `GET` | `/auth/sso/callback/mobile` | OAuth1 callback (mobile-specific, deep link only) |
| `GET` | `/auth/me` | Get current authenticated user profile |
| `GET` | `/auth/snipeit/verify` | Internal auth subrequest endpoint (Nginx only) |
| `GET` | `/auth/logout` | Clear token cookie and redirect to frontend |

---

## User endpoints (`/api/users`)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/users` | List all users (technician only) |
| `GET` | `/api/users/{user_id}` | Get user by ID |
| `PATCH` | `/api/users/{user_id}` | Update user profile |

---

## Project endpoints (`/api/projects`)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/projects` | List projects (filtered by current user membership) |
| `POST` | `/api/projects` | Create a new project |
| `GET` | `/api/projects/{project_id}` | Get project detail |
| `PATCH` | `/api/projects/{project_id}` | Update project (name, description, status, etc.) |
| `GET` | `/api/projects/{project_id}/members` | List project members |
| `POST` | `/api/projects/{project_id}/members` | Add member to project |
| `DELETE` | `/api/projects/{project_id}/members/{user_id}` | Remove member from project |
| `POST` | `/api/projects/{project_id}/requisitions` | Submit a new equipment requisition for this project |
| `GET` | `/api/projects/{project_id}/requisitions` | List requisitions for this project |

---

## Equipment endpoints (`/api/equipment`)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/equipment/catalog` | List all physical assets (from Snipe-IT) |
| `GET` | `/api/equipment/catalog/available` | List available assets (not reserved or checked out) |
| `POST` | `/api/equipment/catalog/sync` | Trigger catalog sync from Snipe-IT |
| `GET` | `/api/equipment/{equipment_id}` | Get real-time asset detail from Snipe-IT |
| `POST` | `/api/equipment/{equipment_id}/refresh` | Force local DB refresh from Snipe-IT for one asset |

---

## Requisition endpoints (`/api/requisitions`)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/requisitions` | List all requisitions (technician: all; student: own) |
| `GET` | `/api/requisitions/{req_id}` | Get requisition detail |
| `POST` | `/api/requisitions/{req_id}/approve` | Approve a requisition (technician only) |
| `POST` | `/api/requisitions/{req_id}/reject` | Reject a requisition (technician only) |
| `POST` | `/api/requisitions/sync-snipeit` | Sync checkout/check-in events from Snipe-IT activity log |

---

## Utility endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/` | Health check (returns `{"message": "Hello World"}`) |
| `GET` | `/health-db` | Database connectivity check |

---

## Request / response schemas

Schemas are defined in `apps/api/routers/schemas.py` and `apps/api/auth/schemas.py`. The full interactive schema is available in the Swagger UI at `/docs`.

### Example: create a requisition

```http
POST /api/projects/{project_id}/requisitions
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [12, 15]
}
```

Where `items` is a list of Snipe-IT asset IDs to request.

### Example: approve a requisition

```http
POST /api/requisitions/{req_id}/approve
Authorization: Bearer <token>
```

### Example: reject a requisition

```http
POST /api/requisitions/{req_id}/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Insufficient description of need."
}
```

---

## Authentication

Protected endpoints require a JWT token. The token can be provided as:

1. **Cookie:** `token=<JWT>` — used by the web app.
2. **Authorization header:** `Authorization: Bearer <JWT>` — used by the mobile app and external clients.

:::tip
Use the Swagger UI's "Authorize" button to provide your token when testing endpoints interactively.
:::
