---
sidebar_position: 4
title: Known Limitations
description: Current limitations and known issues in the DETI Maker Lab system.
---

# Known Limitations

This page documents known limitations and outstanding issues in the current version of the system. These are not bugs that block operation, but areas that need further work before a full production release.

---

## Mobile application

- **UI polish is incomplete.** Some screens have missing loading states, edge case layout issues, or rough interactions. The app is functional but not fully refined.
- **Not all web features have mobile equivalents.** The mobile app covers core workflows (dashboard, catalog, ledger, projects, profile) but some admin and management features are limited on mobile.
- **Statistics screen is partially implemented.** The statistics tab is present but the data visualization is incomplete.
- **iOS deep link behavior is not fully verified.** The deep link authentication flow has been designed and implemented, but needs testing on physical iOS devices to confirm reliable behavior across iOS versions.
- **No push notifications.** Notifications are in-app only. There is no push notification infrastructure for mobile.
- **Full user testing has not been completed.** The mobile app has not been through structured user acceptance testing with real lab users.

---

## Web application

- **Statistics page is a placeholder.** Usage statistics and analytics are listed in the navigation but are not fully implemented.
- **Some edge cases in permission enforcement may need review.** For example, edge cases where a user is removed from a project mid-workflow.

---

## Snipe-IT integration

- **Sync is polling-based, not event-driven.** Checkout and check-in detection requires polling the Snipe-IT activity log. There is no real-time webhook mechanism.
- **`SNIPEIT_RESERVED_STATUS_ID` must be configured manually.** The numeric ID of the "Reserved" status label varies between Snipe-IT instances and must be set correctly.
- **Activity log polling has a fixed depth (200 entries).** High-volume labs may need to increase this limit.

---

## Deployment and operations

- **No automated monitoring or alerting.** There are no configured health check dashboards or alert systems.
- **No overdue return alerts.** There is no automated mechanism to notify technicians or students when equipment has been checked out for longer than expected.
- **Production deployment requires hardening.** The system works correctly in testing, but a full production deployment requires completing the [Production Checklist](../deployment/production-checklist.md).
- **No automated testing pipeline.** There is no CI/CD pipeline with automated tests. All validation is manual.

---

## Data and consistency

- **Migration does not import requisition history.** Only users, projects, and equipment are migrated from the legacy wiki. Historical requisition records are not imported in the initial phase.
- **Legacy professor detection is approximate.** The migration tool attempts to detect professor accounts from email patterns, but this may not be accurate for all university email formats — needs verification.
- **Equipment items with blank Código are skipped.** These items need to be reviewed and entered manually after migration.

---

## Authentication

- **JWT tokens are not revocable.** Once issued, a JWT is valid until it expires. There is no token blacklist. Logging out only clears the client-side cookie — the token itself remains valid until expiry.
- **No rate limiting on authentication endpoints.** This is a known security gap for future improvement.
