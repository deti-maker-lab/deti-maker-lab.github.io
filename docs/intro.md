---
sidebar_position: 1
title: DETI Maker Lab Documentation
description: Technical documentation for the DETI Maker Lab information system.
---

# DETI Maker Lab Documentation

Welcome to the technical documentation of the **DETI Maker Lab information system**.

This documentation describes the current architectural baseline of the project and is meant to serve two purposes:

1. provide a professional technical reference for the current implementation stage;
2. create a documentation structure that can be incrementally extended in future milestones.

## What this documentation covers

At the current stage, the documentation focuses on:

- project scope and current system state;
- solution architecture and runtime components;
- infrastructure and deployment topology;
- PostgreSQL database setup and configuration;
- backend and integration responsibilities;
- frontend and mobile application responsibilities;
- engineering workflow, repository conventions, and quality practices.

## Current project baseline

The system is being designed as a **new application layer** around the DETI Maker Lab workflow, while preserving the value of the previous installed base. The main architectural decisions at this stage are:

- **Snipe-IT** is the authoritative source for inventory and equipment availability;
- **PostgreSQL** stores project-domain data such as users, projects, requisitions, assignments, and history;
- the backend coordinates business logic, authentication integration, and inventory synchronization;
- web and mobile clients consume the same application services;
- the legacy wiki is treated as a source of prior data and domain knowledge, not as the future operational core.

## Intended audience

This documentation is written for:

- project team members;
- supervisors and reviewers;
- future contributors;
- DevOps or infrastructure administrators who need to deploy or maintain the platform.

## Reading path

For a first read, use this order:

1. **Overview**
2. **Architecture**
3. **Infrastructure**
4. **Database**
5. **Backend**
6. **Frontend**
7. **Engineering**
