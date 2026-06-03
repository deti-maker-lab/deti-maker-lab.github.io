---
sidebar_position: 3
title: Backend
description: FastAPI backend structure, services, models, authentication, and Snipe-IT client.
---

# Backend

## Stack

| Technology | Purpose |
|---|---|
| Python 3.12 | Runtime |
| FastAPI | Web framework |
| SQLModel | ORM (built on SQLAlchemy + Pydantic) |
| Pydantic | Data validation and settings |
| PyJWT | JWT creation and validation |
| requests-oauthlib | OAuth1 client for SSO |
| psycopg | PostgreSQL driver |
| uvicorn | ASGI server |

---

## Entry point

`apps/api/main.py`

Creates the FastAPI app, registers CORS middleware, and includes all routers:

```python
app = FastAPI(title="DETI Maker Lab API", version="1.0")

app.include_router(auth_router, tags=["auth"])
app.include_router(equipment_router)
app.include_router(requisitions_router)
app.include_router(projects_router)
app.include_router(users_router)
```

CORS origins are configured from `settings.FRONTEND_URL` — no hardcoded domains.

---

## Configuration

`apps/api/core/config.py`

Settings are loaded from environment variables using Pydantic's `BaseSettings`. All required variables are defined in `.env.example`.

Key settings:

| Setting | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection URL |
| `SNIPEIT_BASE_URL` | Internal Docker URL for Snipe-IT API |
| `SNIPEIT_API_TOKEN` | Snipe-IT personal access token |
| `SNIPEIT_RESERVED_STATUS_ID` | Numeric ID of the "Reserved" status label in Snipe-IT |
| `SNIPEIT_PUBLIC_URL` | Browser-facing Snipe-IT URL |
| `FRONTEND_URL` | Browser-facing frontend URL |
| `SSO_CALLBACK_URL` | OAuth1 callback URL registered with university SSO |
| `DML_AUTH_KEY` | University OAuth1 client key |
| `DML_AUTH_SECRET` | University OAuth1 client secret |
| `JWT_SECRET_KEY` | Secret for JWT signing |
| `JWT_ALGORITHM` | Always `HS256` |
| `JWT_EXPIRE_MINUTES` | Token lifetime (default: 60) |
| `LAB_TECHNICIANS` | Comma-separated list of technician emails |

---

## Database access

`apps/api/db/database.py`

Uses SQLModel's `create_engine` with the `DATABASE_URL`. Sessions are provided via FastAPI dependency injection:

```python
def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
```

---

## Models

`apps/api/db/models.py`

SQLModel classes map to PostgreSQL tables. See [Data Model](../architecture/data-model.md) for the full schema. Key models:

- `User`
- `Project`
- `ProjectMember`
- `EquipmentModel`
- `Equipment`
- `EquipmentRequest`
- `EquipmentRequestItems` _(table exists in schema but SQLModel class is defined in migration context)_
- `EquipmentUsage`
- `StatusHistory`
- `Notification`

---

## Auth module

`apps/api/auth/`

| File | Purpose |
|---|---|
| `router.py` | SSO login, callback, verify, logout endpoints |
| `service.py` | OAuth1 flow, JWT creation, user creation, Snipe-IT user provisioning |
| `dependencies.py` | `get_current_user` dependency for protected routes |
| `schemas.py` | Pydantic schemas for auth responses |

The `get_current_user` dependency reads the JWT from either the `Authorization: Bearer` header or the `token` cookie and returns the authenticated `User` model.

---

## Services

`apps/api/services/`

| File | Responsibility |
|---|---|
| `project_service.py` | Project CRUD, member management, project status transitions |
| `requisition_service.py` | Requisition lifecycle: create, approve, reject, sync with Snipe-IT |
| `inventory_service.py` | Catalog sync from Snipe-IT |
| `notification_service.py` | Create and deliver in-app notifications |
| `users_service.py` | User update logic |
| `constants.py` | Shared constants (status values, etc.) |

---

## Snipe-IT client

`apps/api/services/snipeit/`

The Snipe-IT client is a wrapper around the Snipe-IT REST API using `requests`. It handles:

- Asset listing, detail, and status updates.
- Model listing.
- Activity log polling.
- User creation and lookup.

All calls use the `SNIPEIT_BASE_URL` and `SNIPEIT_API_TOKEN` from settings. The client is injected into services that require Snipe-IT access.

---

## Routers

`apps/api/routers/`

| File | Router prefix | Description |
|---|---|---|
| `equipment.py` | `/api/equipment` | Catalog, sync, asset detail |
| `projects.py` | `/api/projects` | Project CRUD, members, requisitions |
| `requisitions.py` | `/api/requisitions` | Approval, rejection, Snipe-IT sync |
| `users.py` | `/api/users` | User management |
| `schemas.py` | — | Shared Pydantic request/response models |

---

## Running the backend

```bash
# Development (via Turborepo)
pnpm --filter api dev

# Direct (from apps/api with venv active)
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The `pnpm --filter api dev` command uses `venv/bin/uvicorn` directly. You must create the virtual environment first.

---

## Adding a new endpoint

1. Define the Pydantic schema in `routers/schemas.py`.
2. Add the route handler in the appropriate router file.
3. Implement business logic in the corresponding `services/` file.
4. Update the data model in `db/models.py` if new tables or fields are needed.
5. Update `infra/db/init/schema.sql` with any DDL changes.
6. Document the endpoint in [API Reference](./api.md).
