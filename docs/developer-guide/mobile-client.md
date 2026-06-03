---
sidebar_position: 5
title: Mobile Client
description: Expo/React Native mobile app structure, auth context, API wrapper, and screens.
---

# Mobile Client

## Stack

| Technology | Purpose |
|---|---|
| Expo SDK | Managed workflow, build tooling |
| React Native | Cross-platform UI framework |
| Expo Router | File-based navigation |
| Expo SecureStore | Secure token storage |
| NativeWind | Tailwind CSS for React Native |
| TypeScript | Type-safe development |

---

## Running the mobile app

```bash
# From the repo root
pnpm --filter mobile dev

# Or from apps/mobile directly
npx expo start -c -w
```

Press `a` to open in Android emulator, or scan the QR code with Expo Go.

---

## File-based routing (Expo Router)

Navigation is defined by the file system under `app/`:

```
app/
├── _layout.tsx         # Root layout — auth guard
├── login.tsx           # Login screen
├── modal.tsx           # Modal screen
├── auth/               # Auth callback (deep link handler)
└── (tabs)/
    ├── _layout.tsx     # Tab bar definition
    ├── index.tsx       # Dashboard
    ├── equipment.tsx   # Equipment catalog
    ├── ledger.tsx      # Requisition ledger
    ├── projects.tsx    # Project list
    ├── user.tsx        # User profile
    ├── admin.tsx       # Admin panel (technician)
    ├── statistics.tsx  # Statistics
    └── users.tsx       # User management
```

The root `_layout.tsx` wraps everything in the `AuthProvider` and implements the auth guard — unauthenticated users are redirected to `/login`.

---

## Auth context

`context/AuthContext.tsx`

Provides `AuthContext` to the entire app:

```typescript
interface AuthContextType {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}
```

On app startup, the context checks SecureStore for a stored token and hydrates the auth state.

- `login(token)` — writes token to SecureStore and updates state.
- `logout()` — deletes token from SecureStore and clears state.

---

## Secure token storage

JWT tokens are stored using `expo-secure-store`, which uses:
- **Android**: Android Keystore
- **iOS**: iOS Keychain

This prevents the token from being readable by other apps.

---

## API wrapper

`lib/`

The API client reads the API base URL from app constants and attaches the JWT token from SecureStore as a `Bearer` token in the `Authorization` header:

```typescript
const response = await fetch(`${API_BASE_URL}/api/projects`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

---

## Deep link authentication

The app scheme `detimakerlab` is registered in `app.json`. After SSO:

1. The API redirects to `detimakerlab://auth?token=<JWT>`.
2. The OS intercepts the deep link.
3. The `app/auth/` screen captures the `token` parameter.
4. `login(token)` is called to store it.
5. The user is navigated to the main tab bar.

---

## Environment variables

Set in `apps/mobile/.env`:

| Variable | Description |
|---|---|
| `EXPO_PUBLIC_API_URL` | Backend API base URL |

---

## Adding a new screen

1. Create a file in `app/(tabs)/` for a new tab, or in `app/` for a full-screen route.
2. Implement the screen component.
3. If it requires auth, the root `_layout.tsx` auth guard already covers it.
4. If it is role-restricted, add a role check inside the screen using `AuthContext`.
5. Update the tab bar in `app/(tabs)/_layout.tsx` if adding a visible tab.
