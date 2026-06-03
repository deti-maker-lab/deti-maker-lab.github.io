---
sidebar_position: 6
title: Mobile Architecture
description: Expo/React Native mobile app structure, authentication, and current state.
---

# Mobile Architecture

## Overview

The mobile application is built with **Expo** (SDK) and **React Native**, using **Expo Router** for file-based navigation. It targets both Android and iOS and shares the same backend API as the web application.

---

## Technology stack

| Technology | Purpose |
|---|---|
| Expo | Managed workflow, build tools |
| React Native | Cross-platform UI framework |
| Expo Router | File-based navigation and deep linking |
| Expo SecureStore | Secure JWT token storage |
| NativeWind | Tailwind CSS styling for React Native |
| TypeScript | Type-safe development |

---

## Authentication flow

The mobile app uses the same University of Aveiro SSO as the web app, but with a different callback mechanism:

1. User taps "Login" → app opens the SSO URL in the device browser.
2. User authenticates with university credentials.
3. SSO redirects to `/auth/auth` on the server.
4. API issues JWT and redirects to `detimakerlab://auth?token=<JWT>`.
5. The OS intercepts the deep link and opens the app.
6. The app reads the token from the URL and stores it in **Expo SecureStore**.

The scheme `detimakerlab` is registered in `app.json`.

---

## File structure

```
apps/mobile/
├── app/
│   ├── _layout.tsx         # Root layout — auth guard and navigation
│   ├── login.tsx           # Login screen
│   ├── modal.tsx           # Generic modal screen
│   ├── auth/               # Auth callback screen (handles deep link)
│   └── (tabs)/
│       ├── _layout.tsx     # Tab bar configuration
│       ├── index.tsx       # Dashboard (home)
│       ├── equipment.tsx   # Equipment catalog
│       ├── ledger.tsx      # Requisition ledger
│       ├── projects.tsx    # Project list
│       ├── user.tsx        # User profile
│       ├── admin.tsx       # Admin/technician panel
│       ├── statistics.tsx  # Statistics view
│       └── users.tsx       # Users management
├── context/
│   └── AuthContext.tsx     # Auth state and token management
├── lib/                    # API client
├── hooks/                  # Custom hooks
├── components/             # Shared UI components
└── constants/              # App-wide constants
```

---

## Authentication context

`AuthContext.tsx` provides the global authentication state:

- `token` — current JWT, loaded from SecureStore on app start.
- `login(token)` — stores the token in SecureStore and updates state.
- `logout()` — clears the token from SecureStore and state.

All screens that require authentication are wrapped in the auth guard in `_layout.tsx`. Unauthenticated users are redirected to the login screen.

---

## API client

The mobile app uses a shared API client in `lib/` that:

- Reads the base URL from app constants (`EXPO_PUBLIC_API_URL`).
- Attaches the JWT from SecureStore as a `Bearer` token in the `Authorization` header.
- Handles 401 responses by logging the user out.

---

## Screens

| Screen | Role | Description |
|---|---|---|
| Login | All | SSO login button; redirects to browser |
| Dashboard (index) | All | Summary of projects and recent activity |
| Equipment | All | Browse equipment catalog |
| Ledger | All | View and track own requisitions |
| Projects | All | List and create projects |
| Profile (user) | All | View own profile and logout |
| Admin | Technician | Approve/reject requisitions, manage inventory |
| Statistics | All | Usage statistics (partially implemented) |
| Users | Technician | User management |

---

## Running the app (development)

```bash
# From the repo root
pnpm --filter mobile dev
```

Or from the mobile directory:
```bash
npx expo start -c -w
```

Press `a` for Android emulator, or scan the QR code with Expo Go.

:::info
Android development is local using Android Studio. iOS cannot be simulated locally on Windows — use a physical device or a cloud build service.
:::

---

## Current limitations and known issues

- Some screens have UI polish remaining (layout, styling, loading states).
- Not all web app features have mobile equivalents implemented.
- The statistics screen is partially implemented.
- The app has not been through full end-to-end user testing.
- iOS deep link behavior may vary by device and iOS version — _needs verification on physical device_.
- There is no push notification support yet (in-app notifications only).

See [Known Limitations](../maintenance/known-limitations.md) for the full list.
