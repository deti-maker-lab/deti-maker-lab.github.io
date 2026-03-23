---
title: Deployment Topology
sidebar_position: 1
---

# Deployment Topology

## Overview

The current baseline assumes deployment inside a university-managed environment, with the main services reachable through a controlled network boundary.

## Runtime nodes

### Client devices

Two client types are supported:

- browser clients on desktop or laptop devices;
- mobile applications on Android and iOS.

### Reverse proxy

The reverse proxy is the external-facing entry point and is responsible for:

- receiving inbound HTTP(S) traffic;
- routing traffic to the application server;
- providing a clean network boundary;
- supporting future hardening, TLS termination, and request filtering.

### Application server

The application server hosts:

- project and requisition business logic;
- API endpoints;
- integration logic for Snipe-IT;
- authentication integration logic;
- legacy migration utilities when required.

### PostgreSQL node

The Maker Lab PostgreSQL database stores all project-domain records. It is intentionally separate from the Snipe-IT database.

### Snipe-IT node

Snipe-IT is deployed as a separate service and remains the authority for inventory data.

### External services

External or institutional services include:

- university authentication service;
- legacy wiki or legacy data source during migration.

## Network model

The simplified runtime flow is:

1. a client sends a request over HTTPS;
2. the reverse proxy forwards the request internally;
3. the application server processes the request;
4. the application server reads or writes project-domain data in PostgreSQL;
5. when inventory data is needed, the application server calls the Snipe-IT API;
6. authentication flows are delegated to the university identity system.

## Deployment recommendation

For maintainability, keep the following separation even if services initially share infrastructure:

- application database lifecycle separate from Snipe-IT database lifecycle;
- secrets management separate from source code;
- migration utilities isolated from normal runtime services.

## Included diagram

![Deployment diagram](/img/architecture/deployment-diagram.jpeg)
