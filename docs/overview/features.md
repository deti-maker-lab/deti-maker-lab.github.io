---
sidebar_position: 4
title: Features
description: A summary of system features by area.
---

# Features

## Project management

- Create projects with structured metadata: name, description, course, academic year, group number, tags, and links.
- Join existing projects as a member, observer, advisor, or supervisor.
- Manage project membership from the project detail page.
- Projects move through states: `pending → active → completed / archived / rejected`.
- Lab technicians can approve or change project status.

---

## Equipment catalog

- Browse all physical assets imported from Snipe-IT.
- Filter and search by model, family, availability, and location.
- View real-time asset availability (available, reserved, checked out, in maintenance).
- Equipment models are synchronized from Snipe-IT and cached locally in PostgreSQL.
- On-demand catalog sync via `POST /api/equipment/catalog/sync`.

---

## Requisitions

- Submit a requisition for one or more specific physical assets.
- Track requisition status through: `pending → reserved / rejected → checked_out → returned`.
- View rejection reason if the request was declined.
- Multiple requisitions allowed per project.
- Status history records every transition with timestamp and actor.

---

## Technician dashboard

- View all pending, reserved, and active requisitions.
- Approve or reject requests with an optional reason.
- View project details and member information.
- Manage users and their roles.
- Link out to Snipe-IT for physical asset management.

---

## Snipe-IT integration

- Snipe-IT is the authoritative inventory system — the MakerLab does not duplicate physical asset management.
- Equipment models are synced from Snipe-IT to the local database.
- Approval triggers a `Reserved` status update in Snipe-IT via the Snipe-IT REST API.
- Checkout and check-in events in Snipe-IT are detected through the activity log and reflected locally.
- Technicians access Snipe-IT through a protected Nginx route that verifies JWT and enforces `lab_technician` role.

---

## Single Sign-On (SSO)

- Authentication uses the University of Aveiro OAuth1-based SSO.
- On first login, user records are created automatically in the local database.
- Role assignment (`student`, `professor`, `lab_technician`) is performed at login time.
- JWT tokens are issued after SSO callback and stored as cookies.
- Mobile app uses a deep-link callback (`detimakerlab://auth?token=…`) after SSO.

---

## Notifications

- In-app notifications are sent for key events:
  - Requisition approved or rejected.
  - Equipment checked out or returned.
- Notifications are stored in the `notifications` table and exposed via the API.
- Users can mark notifications as read.

---

## Mobile app

- Expo / React Native app for Android and iOS.
- Shares the same backend API as the web app.
- Supports login via SSO using deep-link callback.
- Screens: dashboard, equipment catalog, requisition ledger, project list, user profile.
- Technician and admin tabs available to users with the appropriate role.
- Token stored securely using Expo SecureStore.

:::warning
The mobile app is functional but is still being polished. Some screens may have UI limitations. Production-level hardening and full user testing are future work items. See [Known Limitations](../maintenance/known-limitations.md).
:::

---

## Migration support

- Python CLI tool (`apps/migration/makerlab_migrate/cli.py`) for importing legacy data.
- Imports users, projects, project members, equipment models, and equipment assets from a PostgreSQL dump of the legacy wiki.
- Supports dry-run mode to preview changes without writing.
- Idempotent — safe to run multiple times.
- Syncs imported equipment models and assets to Snipe-IT.

See [Migration](../migration/overview.md) for details.
