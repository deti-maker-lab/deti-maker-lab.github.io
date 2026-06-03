---
sidebar_position: 1
title: Introduction
description: What DETI Maker Lab is, why it was built, and who this documentation is for.
---

# DETI Maker Lab

**DETI Maker Lab** is an open university laboratory at the Department of Electronics, Telecommunications and Informatics (DETI) of the University of Aveiro. Students, teachers, and staff develop electronics, telecommunications, and informatics projects using shared equipment and facilities.

## The old problem

The previous lab workflow was built around a MediaWiki installation:

- Projects were created as wiki pages with hand-crafted Markdown.
- Equipment requisitions were informal, manual, and tracked inconsistently.
- Equipment inventory was maintained separately in Snipe-IT, but the two systems had no integration.
- Data was fragmented: requisition history, project state, and equipment availability lived in different places.
- There was no structured approval flow — technicians had no dedicated tool to review, approve, or reject requests.

The result was inconsistent data, difficult tracking, and a process that placed unnecessary burden on lab technicians and project leaders.

## The new solution

The new system transforms the workflow from **wiki-centred** to **project-centred**.

Projects and project groups become the primary entry point. From there:

1. Users log in with their University of Aveiro SSO account.
2. Users create or join a project.
3. Users browse the equipment catalog and submit requisitions.
4. The lab technician reviews, approves, or rejects each request.
5. Approved requests reserve equipment in Snipe-IT.
6. The technician checks out the physical asset in Snipe-IT.
7. The system detects the checkout and updates the local request state.
8. The student returns the equipment.
9. The technician checks the asset back in to Snipe-IT.
10. The system detects check-in and marks the request as returned.
11. Status history and notifications preserve full traceability.

## Feature summary

| Feature | Description |
|---|---|
| SSO authentication | Login with University of Aveiro university credentials |
| Project management | Create projects, join groups, manage members |
| Equipment catalog | Browse, search, and filter available assets |
| Requisitions | Submit and track equipment requests |
| Technician dashboard | Approve/reject requests, manage inventory |
| Snipe-IT integration | Authoritative inventory sync, reservation, checkout/check-in |
| Status history | Full audit trail for all state transitions |
| Notifications | In-app alerts for request events |
| Mobile app | Expo/React Native app for iOS and Android |
| Migration tooling | Python CLI for importing legacy Wiki data |

## Who this documentation is for

| Audience | Sections to read |
|---|---|
| **Students and project members** | [User Guide](./user-guide/getting-started.md) |
| **Lab technician** | [User Guide → Technician Workflow](./user-guide/technician-workflow.md), [Deployment](./deployment/overview.md) |
| **Supervisors / professors** | [Overview](./overview/problem-and-solution.md), [User Guide](./user-guide/getting-started.md) |
| **System administrators** | [Deployment](./deployment/overview.md), [Maintenance](./maintenance/routine-tasks.md) |
| **Future developers** | [Architecture](./architecture/system-architecture.md), [Developer Guide](./developer-guide/local-development.md) |

:::info
The documentation is structured so each audience can read their relevant sections without reading the whole site. Start with the section most relevant to your role.
:::
