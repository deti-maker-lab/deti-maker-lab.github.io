---
sidebar_position: 4
title: Web Frontend
description: Next.js web application structure, screens, API client, i18n, and authentication.
---

# Web Frontend

## Stack

| Technology | Purpose |
|---|---|
| Next.js (App Router) | React framework with server and client components |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| i18next | Internationalization |

---

## Project structure

```
apps/web/src/
├── app/
│   ├── admin/         # Admin management: user list, requisition management
│   ├── auth/          # SSO callback handler (/auth/callback)
│   ├── components/    # Shared UI components (navbar, sidebar, cards)
│   ├── equipment/     # Equipment catalog pages
│   ├── ledger/        # Requisition ledger pages
│   ├── projects/      # Project list and detail pages
│   ├── statistics/    # Statistics pages (placeholder / future work)
│   ├── users/         # User profile pages
│   ├── layout.tsx     # Root layout with navigation shell
│   └── page.tsx       # Dashboard (home page)
├── lib/               # API client and utility functions
├── i18n.ts            # i18next configuration
└── locales/           # Translation JSON files (en, pt, ...)
```

---

## Running the web app

```bash
pnpm --filter web dev
```

Starts the Next.js dev server at `http://localhost:3000`.

---

## Authentication flow

1. User clicks **Login** → the app redirects to `/auth/sso/login` on the backend.
2. SSO completes → backend redirects to `/auth/callback?token=<JWT>`.
3. The `auth/` route handler extracts the token from the URL and stores it as a cookie.
4. All subsequent API requests include the cookie automatically.

On logout, the cookie is cleared and the user is redirected to the login page.

---

## API client

Located in `apps/web/src/lib/`.

The API client uses `fetch` against the `NEXT_PUBLIC_API_URL` environment variable (set at build time). It:
- Attaches the JWT cookie automatically (cookies are included by the browser).
- Handles response parsing and error propagation.
- Exposes typed functions for each API area (projects, equipment, requisitions, users).

---

## Environment variables

Set at **build time** for Next.js (baked into the bundle):

| Variable | Example | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `/new` | Base path prefix for Next.js router |
| `NEXT_PUBLIC_API_URL` | `/new/api` | Browser-facing API prefix |
| `NEXT_PUBLIC_SNIPEIT_URL` | `https://...` | Public Snipe-IT URL for sidebar link |

:::warning
Changing these variables requires rebuilding the Next.js container. Use `docker compose up -d --build web`.
:::

---

## Internationalization (i18n)

The web app uses **i18next** for internationalization. Translation files are located in `src/locales/`.

The i18next configuration is in `src/i18n.ts`. Language detection and switching may be added in future iterations.

---

## Key pages

| Route | Description |
|---|---|
| `/` | Dashboard — project summary, recent activity |
| `/projects` | Project list |
| `/projects/[id]` | Project detail, members, requisitions |
| `/equipment` | Equipment catalog browse |
| `/equipment/[id]` | Equipment detail |
| `/ledger` | User's requisition history |
| `/auth/callback` | Handles SSO JWT callback |
| `/admin` | Admin panel (technician only) |
| `/users/[id]` | User profile |

---

## Deployment notes

The Next.js app is served from Docker using a standalone build. The `Dockerfile` in `apps/web/` produces a minimal production image.

The base path (`NEXT_PUBLIC_BASE_PATH`) must be set correctly at build time for the app to generate correct internal links. An incorrect base path causes all navigation to break.
