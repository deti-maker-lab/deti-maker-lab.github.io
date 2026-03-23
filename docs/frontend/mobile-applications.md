---
title: Mobile Applications
sidebar_position: 2
---

# Mobile Applications

## Purpose

Mobile applications exist to support project workflows away from the desktop interface, especially repeated requisition-related interactions.

## Technology direction

The current baseline uses **React Native** for mobile development.

This is a practical choice because it aligns with the React-based web stack while supporting both Android and iOS.

## Current project context

The project inherits the following mobile situation from previous work:

- Android support exists but requires renewal or improvement;
- iOS support was started previously but remains unfinished.

This means the current project is not introducing mobile support from zero; it is continuing and restructuring existing work.

## Recommended mobile scope

At the current stage, mobile support should prioritize the most valuable workflow actions:

- authentication;
- project context selection;
- requisition submission;
- requisition status tracking;
- return-related visibility.

Technician-first inventory administration can remain more web-oriented if needed.

## Design priorities

Mobile screens should emphasize:

- few-step flows;
- concise information density;
- clear status indicators;
- reliable authentication handoff;
- consistency with backend permissions.

## Documentation rule

Whenever mobile behavior diverges from the web client, the difference should be documented explicitly in future versions of this section.
