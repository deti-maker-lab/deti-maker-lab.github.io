---
sidebar_position: 2
title: Glossary
description: Definitions of key terms used throughout the DETI Maker Lab documentation.
---

# Glossary

## DETI Maker Lab

An open university laboratory at the Department of Electronics, Telecommunications and Informatics (DETI) of the University of Aveiro. Provides shared equipment, tools, and workspace for students, teachers, and staff working on electronics, telecommunications, and informatics projects.

---

## API (Application Programming Interface)

The FastAPI backend service that provides a REST API consumed by the web and mobile clients. It handles business logic, database access, SSO authentication, and Snipe-IT integration. Accessible at `/api/*` when deployed behind Nginx.

---

## Check-in

The process of returning a physical asset to Snipe-IT inventory. Performed by the lab technician in the Snipe-IT interface. The MakerLab system detects check-in events by polling the Snipe-IT activity log and updates the corresponding requisition to `returned`.

---

## Checkout

The process of physically handing out an asset to a user, recorded in Snipe-IT. Performed by the lab technician after a requisition has been approved. The MakerLab system detects checkout events from the Snipe-IT activity log and updates the requisition to `checked_out`.

---

## Docker Compose

The container orchestration tool used to define and run the full DETI Maker Lab stack. All six services (PostgreSQL, API, web, Snipe-IT, MariaDB, Nginx) are defined in `infra/docker/docker-compose.yml`.

---

## JWT (JSON Web Token)

A compact, signed token used for stateless authentication. After SSO login, the backend issues a JWT containing the user's email address (`sub` claim) and expiry (`exp`). The token is used by the web and mobile clients to authenticate API requests.

---

## Nginx

An open-source web server and reverse proxy. In this system, Nginx acts as the single public entry point: it terminates HTTPS, routes requests by path prefix, and enforces technician-only access to Snipe-IT using the `auth_request` mechanism.

---

## Project

A structured record representing a lab project. Created by a user and used as the organizational unit for equipment requisitions. A project has a name, description, status, members with roles, and associated requisitions.

---

## Requisition

A formal request to borrow one or more physical assets from the lab for a specific project. Requisitions go through the lifecycle: `pending → reserved/rejected → checked_out → returned`. Also referred to as an equipment request.

---

## Reservation

The state of a physical asset after a requisition has been approved. The asset's status in Snipe-IT is set to `Reserved` to indicate it is allocated to a specific project but has not yet been physically checked out.

---

## Snipe-IT

An open-source IT asset management system used as the authoritative inventory platform for DETI Maker Lab. Manages physical equipment models, assets, locations, checkout/check-in records, and asset status labels. Version v8.3.6 is used.

---

## SSO (Single Sign-On)

The University of Aveiro's centralized authentication service (`identity.ua.pt`). Users log in with their university credentials through OAuth 1.0. The DETI Maker Lab system does not store passwords — all authentication is delegated to SSO.

---

## Status history

An immutable audit log table (`status_history`) that records every status transition for projects, equipment requests, equipment usage, and physical equipment. Each record captures the entity, old status, new status, actor, timestamp, and an optional note.

---

## Technician

A lab staff member with the `lab_technician` role. Technicians approve or reject equipment requisitions, manage the physical inventory in Snipe-IT, and have exclusive access to the Snipe-IT interface through the Nginx auth gate. Identified by their university email address in the `LAB_TECHNICIANS` environment variable.
