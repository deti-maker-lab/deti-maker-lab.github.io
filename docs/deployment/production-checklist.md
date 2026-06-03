---
sidebar_position: 5
title: Production Checklist
description: Hardening checklist for production deployments.
---

# Production Checklist

Before exposing the system to real users, complete all items in this checklist.

---

## TLS / HTTPS

- [ ] Replace self-signed certificates in `infra/nginx/certs/` with valid certificates from a trusted CA (e.g., Let's Encrypt via Certbot).
- [ ] Verify HTTPS is working without browser certificate warnings.
- [ ] Configure certificate auto-renewal.

---

## Secrets and credentials

- [ ] `JWT_SECRET_KEY` is a strong, randomly generated string (at least 32 bytes). Not the placeholder from `.env.example`.
- [ ] `POSTGRES_PASSWORD` and `MYSQL_PASSWORD` are strong, unique passwords.
- [ ] `SNIPEIT_API_TOKEN` has been generated via the bootstrap script (not left blank).
- [ ] `DML_AUTH_KEY` and `DML_AUTH_SECRET` are the real credentials from the University SSO provider.
- [ ] No secrets are committed to version control (`.env` files are in `.gitignore`).

---

## SSO registration

- [ ] `SSO_CALLBACK_URL` (`https://<domain>/auth/auth`) is registered with the University of Aveiro identity provider (`identity.ua.pt`).
- [ ] The registered callback URL matches exactly the value in `apps/api/.env`.

---

## Snipe-IT

- [ ] Snipe-IT `APP_URL` matches the public Snipe-IT URL.
- [ ] Status labels are configured: `Available`, `Reserved`, `Checked Out`.
- [ ] `SNIPEIT_RESERVED_STATUS_ID` matches the actual numeric ID of the `Reserved` label in this Snipe-IT instance.
- [ ] Snipe-IT bootstrap script has been run successfully.
- [ ] Snipe-IT is accessible only through Nginx (port 8080 is not exposed publicly).

---

## Database

- [ ] PostgreSQL password is strong and unique.
- [ ] PostgreSQL port (5432) is not publicly accessible.
- [ ] Database backups are scheduled and tested. See [Backups and Restore](../maintenance/backups-and-restore.md).
- [ ] The application uses a least-privilege database user (not the superuser) — _to verify in current setup_.

---

## Access control

- [ ] `LAB_TECHNICIANS` contains only the emails of authorized technicians.
- [ ] Only technicians can access Snipe-IT (enforced by Nginx auth_request).
- [ ] `APP_DEBUG=false` in `apps/api/.env`.
- [ ] `APP_ENV=production` in `apps/api/.env`.

---

## Nginx

- [ ] HTTP is redirected to HTTPS (already configured in template).
- [ ] Only ports 80 and 443 are exposed to the internet.
- [ ] Direct port access to API (8000) and Snipe-IT (8080) is blocked by firewall rules.

---

## Monitoring and health checks

- [ ] Container health checks are configured (PostgreSQL and MariaDB have `healthcheck` blocks).
- [ ] The API `/health-db` endpoint is reachable and returns `{"status": "ok"}`.
- [ ] Docker container restart policies are set to `unless-stopped`.
- [ ] Consider setting up log aggregation (e.g., collecting Docker logs to a central system).

---

## Backups

- [ ] PostgreSQL backup schedule is configured.
- [ ] MariaDB (Snipe-IT) backup schedule is configured.
- [ ] Snipe-IT storage volume (`snipeit_storage`) is backed up.
- [ ] Backup restoration procedure has been tested.

---

## Performance and availability

- [ ] Sufficient server resources for all containers under expected load.
- [ ] Docker volumes are on persistent storage (not ephemeral).
- [ ] Consider adding a load balancer or CDN for high availability (future work).
