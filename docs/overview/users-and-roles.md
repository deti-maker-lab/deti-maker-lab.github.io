---
sidebar_position: 2
title: Users and Roles
description: Who uses the system, what they can do, and how roles are assigned.
---

# Users and Roles

The system defines three operational roles. Roles are assigned automatically at login based on the user's university email address and a configurable list of technician emails.

---

## Roles

### Student

The default role for any university SSO user who is not on the technician list.

**Responsibilities:**
- Create and join projects.
- Submit equipment requisitions for their project.
- Track requisition status.
- Return equipment after use.

**Permissions:**
- Read the equipment catalog.
- Submit and view their own requisitions.
- Manage their own project memberships.
- Cannot access Snipe-IT directly.
- Cannot approve or reject requisitions.

---

### Professor / Supervisor

Professors authenticate via the same SSO flow as students. At the moment, professors and students share the same role (`student`) at the system level. Professors may also be assigned the `professor` role if their email domain or username pattern indicates faculty status.

:::info
Professor-specific permissions (e.g., read-only visibility into all projects) may be expanded in future iterations. Currently, the `professor` role is recognized in the data model but has equivalent access to `student` for most operations.
:::

**Responsibilities:**
- Review project activity.
- Maintain visibility over laboratory usage.

---

### Lab Technician

Technicians are identified by their university email address. The email addresses that receive the `lab_technician` role are configured via the `LAB_TECHNICIANS` environment variable in `apps/api/.env`.

**Responsibilities:**
- Review and approve or reject equipment requisitions.
- Reserve, assign, and receive equipment via Snipe-IT.
- Manage the equipment catalog.
- Manage lab users.
- Maintain inventory in Snipe-IT.

**Permissions:**
- Full access to the technician dashboard.
- Access to the Snipe-IT inventory interface (access is enforced at the Nginx layer via JWT verification).
- Can approve, reject, and mark requisitions as returned.
- Are automatically provisioned as Snipe-IT admin users on first login.

---

### System Administrator

The system administrator is responsible for the deployment, configuration, and health of the platform. This is not a role in the application database — it is an operational role.

**Responsibilities:**
- Deploy and maintain Docker Compose services.
- Manage TLS certificates and DNS configuration.
- Configure environment variables and secrets.
- Schedule and verify backups.
- Monitor service health and logs.
- Manage technician email list.
- Register SSO callback URLs with the university identity provider.

---

## Role assignment flow

```
User logs in via University SSO
         │
         ▼
  Is email in LAB_TECHNICIANS list?
         │
    yes ─┤─ no
         │          │
         ▼          ▼
  lab_technician  student (or professor if email pattern matches)
         │
         ▼
  Auto-provision in Snipe-IT as admin
```

Role is set (or updated) every time the user logs in. Removing an email from `LAB_TECHNICIANS` and restarting the API container reverts the user to their default SSO role on their next login.

---

## Summary table

| Role | Create project | Submit requisition | Approve requisition | Access Snipe-IT |
|---|---|---|---|---|
| Student | ✅ | ✅ | ❌ | ❌ |
| Professor | ✅ | ✅ | ❌ | ❌ |
| Lab Technician | ✅ | ✅ | ✅ | ✅ |
| System Administrator | — | — | — | Direct server access |
