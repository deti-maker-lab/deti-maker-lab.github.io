---
slug: tenth-week
title: "Week 10: Smarter Migration, Security Fixes, and UI Polishing"
authors: [laurag]
tags: [makerlab, progress]
---

Last week, our team focused heavily on improving the migration module and strengthening the reliability of the system as a whole. A large part of the work was dedicated to making Snipe-IT integration more dynamic and robust, while also fixing important bugs related to authentication and improving the user interface.

<!-- truncate -->

## Smarter Snipe-IT Lookup During Migration

One of the major improvements this week was implementing **dynamic Snipe-IT location lookup and creation**, followed by **dynamic lookup for categories and manufacturers** as well.

This is an important step because Snipe-IT is supposed to remain the authoritative inventory system in the project architecture. Making the migration module work dynamically with locations, categories, and manufacturers reduces manual effort and makes the migration process much more reliable and scalable. It also fits the project principle of using Snipe-IT properly instead of duplicating inventory logic inside the application layer.

## Better Data Normalization and More Robust Upserts

Another important milestone this week was improving **data normalization** and making Snipe-IT **upserts** more robust. We also fixed migration bugs related to **categories** and **price handling**, and solved a normalization issue that was preventing equipment from appearing correctly in the Snipe-IT inventory.

These changes are especially valuable because the project depends on the accuracy and consistency of structured data. If equipment, models, and related metadata are not imported reliably, the requisition workflow becomes harder to trust. Strengthening this part of the migration supports the broader goal of keeping equipment information synchronized and usable inside the new system. 

## Full Dry-Run Migration Working

A very important result of this week was that the **full dry-run migration** is now working correctly. This is a strong sign that the migration process is becoming mature enough to validate the full flow before real execution.

Since the architecture explicitly includes a one-time migration module for bringing the legacy Maker Lab data into PostgreSQL and Snipe-IT, having a successful dry run is a major step toward a realistic transition from the previous platform to the new one.

## Proxy and Authentication Fixes

This week also included important fixes outside the migration module itself. We fixed **proxy TLS redirect issues**, resolved a bug that caused an **infinite reload** when entering the website before being logged in, and added an **expiration time for the authentication token** so that users are automatically logged out after seven days.

These are important improvements from both the technical and usability perspective. The project architecture depends on university SSO and role-based access, so making authentication behavior more stable and secure is an essential part of building a trustworthy system.

## UI Polishing

Alongside all of the backend and migration work, the user interface also received further polishing. This helps make the system feel more complete and improves the overall quality of the user experience.

This is particularly relevant now, because the project is moving closer to the final stage where the system should not only work technically, but also be presentable and intuitive for its users.

## Why This Week Mattered

This week was especially important because it combined progress in three critical areas:

- stronger and more realistic migration behavior,
- better security and authentication handling,
- and a more polished interface.

Together, these improvements push the project closer to a complete, deployable, and demonstrable product. They also reduce some of the main risks around data migration, system stability, and user access.

## Next Steps

With the migration module becoming much more robust and the main authentication issues resolved, the next steps will likely focus on final validation, continued UI refinement, and making sure the full end-to-end experience works smoothly across the system.