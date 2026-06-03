---
sidebar_position: 1
title: Getting Started
description: How to log in and what each role sees when they first enter the system.
---

# Getting Started

## Logging in

DETI Maker Lab uses the University of Aveiro SSO for authentication. You do not need to create a separate account.

1. Navigate to the DETI Maker Lab web application.
2. Click **Login**.
3. You are redirected to the University of Aveiro identity provider (`identity.ua.pt`).
4. Enter your university credentials.
5. After authentication, you are redirected back to the MakerLab dashboard.

Your user account is created automatically on your first login.

:::info
If you see a certificate warning in your browser, you may be accessing a test deployment with a self-signed certificate. Click "Advanced" and proceed. This should not happen in production.
:::

---

## What you see after login

### Students and professors

After login, you land on the **dashboard**, which shows:
- Your active projects.
- Recent requisitions and their current status.
- Notifications for approval/rejection events.

From the navigation, you can access:
- **Projects** — view and manage your projects.
- **Equipment** — browse the equipment catalog.
- **Ledger** — track all your requisitions.
- **Profile** — view your user information and log out.

---

### Lab technician

Technicians see the same dashboard but with additional navigation items:
- **Admin panel** — view all pending requisitions and manage users.
- **Snipe-IT link** — direct link to the Snipe-IT inventory interface (opens in a new tab, requires technician authentication).

Technicians can do everything students can do, plus approve/reject requests and access Snipe-IT.

---

## Logging out

Click **Profile** (or your name/avatar) in the navigation and select **Logout**.

Your JWT token cookie is cleared. You are redirected to the login page.

---

## Troubleshooting login

| Problem | Likely cause | Solution |
|---|---|---|
| Redirected to SSO but can't authenticate | University credentials issue | Contact university IT support |
| Loop between SSO and callback | SSO callback URL misconfigured | Contact system administrator |
| Dashboard loads but shows no data | No projects yet | Create your first project |
| "Forbidden" when accessing Snipe-IT | Not a lab technician | Contact your lab technician |
