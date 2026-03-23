---
title: Current State of the Project
sidebar_position: 2
---

# Current State of the Project

This page summarizes the technical baseline already established.

## What is already in place

The following elements have already been defined or initiated:

- a high-level solution architecture;
- a deployment topology centered on a reverse proxy, application server, PostgreSQL database, and Snipe-IT instance;
- a relational database design for project-domain data;
- a working direction for backend-to-database communication;
- initial Snipe-IT integration work;
- frontend work and interface mock-ups;
- a project website and documentation baseline;
- a virtual-machine environment used as the deployment target.

## What is considered stable at this stage

The following decisions should be treated as **architectural baseline decisions** unless a later milestone explicitly revises them:

- the platform is **project-centric**;
- requisitions are associated with projects and their members;
- inventory is **not duplicated** in the Maker Lab database;
- Snipe-IT remains the inventory authority;
- PostgreSQL stores application-domain data and workflow history;
- the system must support multiple requisitions during the same project lifecycle;
- the architecture must preserve the value of the existing Maker Lab ecosystem.

## What is still evolving

Some parts of the solution are still being refined and should be considered implementation-level work in progress:

- exact API contract between frontend/mobile and backend;
- final authentication integration details with the university identity provider;
- data migration workflow from the legacy platform;
- production-grade monitoring, backup automation, and CI/CD depth;
- full renewal of Android and completion of iOS support.

## Documentation strategy

This documentation has been written to match the current stage of the project:

- stable decisions are documented as baseline;
- implementation details that may still change are documented as **recommended current approach**;
- future sections can be extended without restructuring the site.
