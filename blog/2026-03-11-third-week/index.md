---
slug: third-week
title: "Week 3: Stating requirments and architecture of the system"
authors: [jakubs]
tags: [makerlab, progress]
---

Last week, our team focused on strengthening the foundation of the project by working on several key analysis and architecture tasks. Our main goal was to move from a general project idea toward a clearer and more structured system definition.

<!-- truncate -->

## Functional and Non-Functional Requirements

A major part of our work was dedicated to defining the **functional** and **non-functional requirements** of the system.

On the functional side, we described what the system should actually do. This included features such as user authentication through the university SSO, role-based access control, assigning users to projects, and supporting the full equipment requisition workflow: request, approval or rejection, assignment, and return. We also specified that the system should support multiple requisitions during a project lifecycle and allow querying data such as active requisitions, overdue returns, and equipment assigned to projects.

On the non-functional side, we focused on qualities that the system must provide. We identified **security**, **data integrity**, **maintainability**, and **acceptable response time** as some of the most important aspects. These requirements are especially important because the platform is meant to be reliable, easy to evolve, and simple enough to use in an academic environment.

## Actors Identification

Another important task was defining the main **actors** of the system. This helped us better understand who will interact with the platform and what their goals are.

We identified three main actors:

- **Students** – the primary users who request equipment for their projects, track requisition status, and return borrowed items.
- **Lab Technician** – the person responsible for managing inventory, approving or rejecting requisitions, and assigning or receiving equipment.
- **Student Supervisor** – a stakeholder who mainly reviews project progress.

Defining these actors gave us a clearer picture of the system’s responsibilities and will help us later when refining use cases and user stories.

## Deployment Diagram

We also worked on the **deployment diagram**, which helped us visualize the high-level technical structure of the solution.

This was an important step because our project is not just about defining features, but also about designing a realistic and viable architecture. The deployment diagram allowed us to think about how the main system components communicate with one another, how the application integrates with external services such as authentication and inventory management, and how the solution can be deployed in practice.

This work gave us a better understanding of the technical dependencies of the project and helped confirm that the proposed architecture is feasible.

## Why This Week Mattered

Overall, this week was about turning ideas into structure. By defining requirements, identifying actors, and preparing the deployment view of the system, we made significant progress toward a more complete and better justified solution.

These results will also serve as an important basis for our next steps, including use cases, architecture refinement, and the implementation of the first working system components.

## Next Steps

In the coming days, we plan to continue refining the system design, expand the use case analysis, and move closer to a working proof of concept that demonstrates communication between the main components of the architecture.