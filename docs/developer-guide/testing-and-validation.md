---
sidebar_position: 7
title: Testing and Validation
description: Current testing approach and manual verification checklist.
---

# Testing and Validation

## Current state

The repository includes a `tests/` directory under `apps/api/`. Automated test coverage is limited at this stage. The primary validation approach is manual testing using the Swagger UI and direct API calls.

:::info
Adding automated tests is a priority for future development. See [Future Work](../maintenance/future-work.md).
:::

---

## API testing with Swagger UI

The interactive Swagger UI at `/docs` (development: `http://localhost:8000/docs`) allows you to:

1. Authenticate using the "Authorize" button (paste your JWT).
2. Test all endpoints interactively.
3. View request and response schemas.
4. Verify error handling and status codes.

---

## Manual test checklist

### Authentication

- [ ] Login via SSO redirects to the university identity page.
- [ ] After login, the user record is created in PostgreSQL.
- [ ] Role is correctly assigned (`student` or `lab_technician`).
- [ ] JWT cookie is set in the browser.
- [ ] Logout clears the cookie.
- [ ] Accessing a protected route without a token returns 401.

### Projects

- [ ] Create a project with valid fields — succeeds.
- [ ] Create a project with missing required fields — returns validation error.
- [ ] View project list — shows only own projects (for students).
- [ ] Add a member to a project.
- [ ] Remove a member from a project.

### Equipment catalog

- [ ] Catalog returns a list of assets.
- [ ] Available-only filter excludes reserved and checked-out assets.
- [ ] Catalog sync (`POST /api/equipment/catalog/sync`) imports models from Snipe-IT.

### Requisitions

- [ ] Submit a requisition for an available asset — creates a `pending` record.
- [ ] Technician approves — status moves to `reserved`; Snipe-IT asset status is updated.
- [ ] Technician rejects with a reason — status moves to `rejected`; reason stored.
- [ ] Checkout in Snipe-IT → sync → status moves to `checked_out`.
- [ ] Check-in in Snipe-IT → sync → status moves to `returned`.
- [ ] Status history records every transition.
- [ ] Notifications are created on approval, rejection.

### Snipe-IT access control

- [ ] Student accessing `/snipe-it/` is redirected to SSO login.
- [ ] After SSO login as student — receives 403 Forbidden.
- [ ] After SSO login as technician — receives 200 and Snipe-IT interface loads.

### Mobile app

- [ ] Login flow completes via deep link.
- [ ] Token is stored in SecureStore.
- [ ] Dashboard shows projects and recent activity.
- [ ] Equipment catalog loads.
- [ ] Ledger shows own requisitions.
- [ ] Logout clears token.

---

## Database validation

After running the stack, verify the database state:

```bash
# Connect to PostgreSQL
docker compose -f infra/docker/docker-compose.yml exec postgres \
  psql -U makerlab -d makerlab

# Check tables exist
\dt

# Verify users table
SELECT id, email, role FROM users;

# Verify equipment models are synced
SELECT COUNT(*) FROM equipment_models;
```

---

## Running existing tests

```bash
cd apps/api
source venv/bin/activate
pytest tests/
```

> **Note:** Test coverage is limited. The test suite is expected to grow in future iterations.

---

## Validation after migration

See [Migration → Validation](../migration/validation.md) for the checklist specific to verifying a successful data migration.
