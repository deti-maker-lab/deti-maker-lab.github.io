---
sidebar_position: 5
title: Future Work
description: Planned improvements and future development priorities for the DETI Maker Lab system.
---

# Future Work

This page lists planned improvements and known gaps that should be addressed in future development iterations.

---

## Mobile application

- **Complete UI polish.** Finish loading states, error handling, edge case layouts, and overall visual consistency.
- **Implement statistics screen.** Build out the usage statistics visualization.
- **Verify iOS deep link authentication.** Test and fix edge cases on physical iOS devices.
- **Add push notifications.** Implement push notification infrastructure (e.g., Expo notifications + backend worker).
- **Conduct user acceptance testing.** Structured testing with real lab users (students, technicians, professors).

---

## Technician dashboard

- **Improve technician dashboard UX.** Make it easier to triage pending requests, see project context, and take bulk actions.
- **Add overdue return alerts.** Notify technicians (and students) when equipment has been checked out past its expected return date.
- **Bulk approval/rejection.** Allow approving or rejecting multiple requests at once.

---

## Statistics and reporting

- **Add a statistics dashboard** showing:
  - Equipment utilization rates.
  - Most requested equipment.
  - Project activity over time.
  - Requisition approval times.
- **Exportable reports** for supervisors and administrators.

---

## Automation and integration

- **Schedule Snipe-IT sync automatically.** Instead of manual or on-demand sync, run `sync-snipeit` on a schedule (e.g., every 5 minutes via cron).
- **Add Snipe-IT webhooks (if available in target version).** Replace polling with event-driven updates.
- **Add email notifications.** Supplement in-app notifications with email for key events.

---

## Security and hardening

- **JWT revocation.** Implement a token blacklist or short-lived token + refresh token pattern.
- **Rate limiting.** Add rate limiting to authentication and sensitive API endpoints.
- **Least-privilege database user.** Create a dedicated application database user instead of using the superuser.
- **Automated security scanning.** Integrate dependency vulnerability scanning into the development workflow.
- **HSTS.** Enable HTTP Strict Transport Security in Nginx.
- **Secrets management.** Move from `.env` files to a proper secrets management system (e.g., HashiCorp Vault).

---

## Testing

- **Add automated tests.** Expand the test suite to cover:
  - API endpoint behavior.
  - Authentication flow.
  - Requisition lifecycle state machine.
  - Snipe-IT sync logic.
- **CI/CD pipeline.** Set up automated testing and build validation on pull requests.
- **Integration tests.** End-to-end tests that cover the full requisition workflow.

---

## Migration

- **Import requisition history.** Extend the migration tool to import historical requisition records from the legacy wiki.
- **Improve professor detection.** Make the migration role mapping more accurate for university email patterns.
- **Handle equipment with blank Código.** Provide a workflow for reviewing and manually importing skipped items.

---

## Operations

- **Monitoring and alerting.** Add container health monitoring, uptime checks, and alerts for service failures.
- **Centralized logging.** Aggregate Docker logs to a central log management system.
- **Automated backups.** Implement and schedule automated database backups with retention policies.
- **Prepare stable production release.** Complete all [Production Checklist](../deployment/production-checklist.md) items and document the final deployment as the stable baseline.
