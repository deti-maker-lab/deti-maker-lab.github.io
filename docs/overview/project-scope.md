---
title: Project Scope
sidebar_position: 1
---

# Project Scope

## Purpose

The DETI Maker Lab is an open laboratory space where students, teachers, and staff develop projects related to electronics, telecommunications, and informatics. The information system is therefore not a secondary tool; it is part of the lab's daily operation.

The purpose of the current project is to modernize the way projects and equipment requisitions are managed, while keeping continuity with the existing Maker Lab ecosystem.

## Problem being addressed

The previous platform established an operational baseline, but several structural limitations were identified:

- equipment requisitions are too cumbersome for repeated day-to-day use;
- project creation through Markdown produces inconsistent and weakly structured data;
- equipment tracking is difficult for the laboratory technician;
- inventory management is not handled by a dedicated stock-management tool;
- the user experience is not sufficiently guided for student groups.

## Current project objectives

The current scope of work includes:

- integrating the Maker Lab workflow with **Snipe-IT** for inventory authority;
- replacing Markdown-based project creation with structured, form-based records;
- implementing a repeatable requisition workflow:
  - request
  - approval or rejection
  - assignment
  - return
- connecting projects, users, requisitions, and equipment usage in a structured relational model;
- integrating authentication with the university identity provider;
- supporting both web and mobile clients.

## Scope boundaries

At this stage, the project documentation assumes the following separation of responsibilities:

| Concern | Responsible system |
|---|---|
| Projects, members, requisitions, workflow state, history | Maker Lab application |
| Inventory, stock state, assets, models | Snipe-IT |
| Authentication | University SSO / identity provider |
| Legacy documentation content | Existing wiki where still useful |

## Delivery philosophy

The project follows a pragmatic principle: **reuse mature tools when they already solve the problem well**.

This is why the architecture intentionally combines:

- a dedicated asset platform for inventory;
- a dedicated application database for domain logic;
- a new application layer for workflow and integration;
- progressive migration from the installed base instead of a destructive replacement.
