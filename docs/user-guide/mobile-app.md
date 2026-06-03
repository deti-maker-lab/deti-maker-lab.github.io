---
sidebar_position: 6
title: Mobile App
description: How to use the DETI Maker Lab mobile application.
---

# Mobile App

The DETI Maker Lab mobile app is built with Expo and React Native. It provides access to the same system as the web app, optimized for mobile devices.

---

## Downloading the app

The app is not published to the App Store or Google Play at this stage. For development and testing:

- **Android**: Use the Expo Go app or a development build installed via Android Studio or `adb`.
- **iOS**: Use a physical device via Expo Go, a development build, or a cloud build service.

---

## Logging in

1. Open the app.
2. Tap **Login**.
3. The app opens your device browser and redirects to the University of Aveiro SSO.
4. Enter your university credentials.
5. After authentication, the browser shows a redirect to the app deep link.
6. The app opens automatically and you are logged in.

Your token is stored securely on the device using Expo SecureStore.

---

## Main screens

### Dashboard (Home)

The home tab shows:
- A summary of your active projects.
- Recent requisition activity.
- Notifications.

### Equipment Catalog

Browse all available lab equipment. View status, model, location, and availability.

### Ledger

View all your equipment requisitions and their current status. Tap any requisition to see full detail including timestamps and rejection reasons.

### Projects

View the list of projects you are a member of. Tap a project to see details and members.

### Profile

View your user information (name, email, role). Log out from this screen.

---

## Technician and admin screens

If your account has the `lab_technician` role, additional tabs appear:

### Admin

- View all pending and active requisitions.
- Approve or reject requests.
- Manage users.

### Users

- Browse all registered users.
- View user roles and details.

---

## Logging out

Tap **Profile** → **Logout**.

Your stored token is cleared. You are returned to the login screen.

---

## Known limitations

- Some screens may have incomplete UI polish (missing loading states, edge case layouts).
- Statistics screen is partially implemented.
- iOS deep link behavior should be verified on a physical device.
- Push notifications are not currently implemented (in-app only).
- The app has not been through full end-to-end user testing.

See [Known Limitations](../maintenance/known-limitations.md) for the full list of outstanding items.

---

## Troubleshooting

| Problem | Likely cause | Solution |
|---|---|---|
| Browser opens SSO but app does not receive token | Deep link not registered | Ensure app scheme `detimakerlab` is registered; try reinstalling |
| "Unauthorized" errors after login | Expired or invalid token | Log out and log in again |
| Blank screens or loading spinners | API unreachable | Check that the backend is running and the API URL is correctly configured |
| Screens show wrong data | Cache issue | Pull to refresh or restart the app |
