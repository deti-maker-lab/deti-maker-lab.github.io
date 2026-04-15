---
slug: sixth-week
title: "Week 6: Backend Integration, Deployment Setup, and SSO"
authors: [laurag]
tags: [makerlab, progress]
---

Last week, our team focused on strengthening the technical foundation of the DETI Maker Lab system. The main goal of this week was to move from separate components into a more complete and working setup, especially on the backend and deployment side.

<!-- truncate -->

## Backend Development Progress

A major part of the week was dedicated to backend development. We continued implementing the application logic that connects the main parts of the system and supports the requisition workflow. This work is an important step because the backend is responsible for linking the frontend, the database, authentication, and the inventory layer into one coherent platform.

At this stage, the backend is no longer just a planned architecture element, but an actively working part of the project.

## Snipe-IT Integration Completed

One of the most important achievements of the week was completing the connection with **Snipe-IT**. Since Snipe-IT is intended to act as the authoritative inventory system in our architecture, finalizing this integration was a key milestone for the project.

This means the application can now communicate correctly with the inventory layer, which brings us much closer to a complete requisition workflow where project-related actions can interact with real equipment data. This is also fully aligned with the project goal of integrating the Maker Lab system with Snipe-IT instead of relying on the previous equipment management approach :contentReference[oaicite:0]{index=0}.

## Docker and Deployment Configuration

Another important area of work this week was deployment. We configured the project to run correctly in a **Docker-based environment**, which improves consistency between development and deployment setups. This makes the system easier to run, test, and maintain across different environments.

In parallel, we also finalized the **Nginx configuration**. It is now fully working and correctly redirects traffic to the different modules of the system. This is an important infrastructure milestone because it ensures that the platform components can coexist behind one entry point, which matches the deployment-oriented architecture defined for the project :contentReference[oaicite:1]{index=1}.

## SSO Working

This week also brought progress in authentication: **SSO is now working**. Since authentication through the university identity system is one of the core functional requirements of the project, this is a very significant result :contentReference[oaicite:2]{index=2}.

Having SSO working means the project is now closer to the intended real usage scenario, where users can access the system through the university authentication flow instead of relying on a separate local login mechanism.

## Why This Week Was Important

This week was especially important because it connected several critical technical pieces of the project:

- backend development,
- Snipe-IT integration,
- Dockerized deployment,
- Nginx routing,
- and SSO authentication.

Together, these achievements show that the project is progressing from design and partial prototypes toward a more complete and deployable system. The technical foundation is becoming much stronger, which will make it easier to continue implementing the remaining workflow features and user-facing functionality in the following weeks.

## Next Steps

With the backend, deployment setup, and authentication now in a much better state, the next steps will focus on extending the implemented functionality and continuing the integration between modules. In particular, this will help us move toward a smoother end-to-end experience for project management and equipment requisitions inside the new Maker Lab system.