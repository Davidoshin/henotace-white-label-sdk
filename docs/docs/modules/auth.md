---
id: auth
title: AuthModule
sidebar_label: Auth
sidebar_position: 1
---

# AuthModule (`tracklr.auth`)

The `AuthModule` handles user onboarding, JWT token lifecycle, 2FA verification, session persistence, and logout across user roles.

---

## Methods

### `login(credentials)`
Authenticates a user with email/username and password. Automatically stores `access` and `refresh` tokens using the active `StorageAdapter`.

```typescript
const response = await tracklr.auth.login({
  email: 'owner@example.com',
  password: 'SecurePassword123'
});

console.log('Welcome:', response.user.first_name);
console.log('Active Business:', response.business?.name);
```

#### Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | Optional | Account email address. |
| `username` | `string` | Optional | Account username (if using username login). |
| `password` | `string` | Required | Account password. |

#### Returns
`Promise<AuthResponse>` containing:
- `user`: Authenticated user profile.
- `business`: Default business profile attached to user.
- `tokens`: `{ access: string, refresh: string }`.

---

### `verifySession()`
Checks if the current cached access token or session cookie is valid. Ideal for route guards and app startup lifecycle.

```typescript
const { valid, user, business } = await tracklr.auth.verifySession();

if (!valid) {
  // Navigate to login
}
```

---

### `logout()`
Calls the backend logout endpoint to invalidate server cookies/tokens and purges stored credentials from `StorageAdapter`.

```typescript
await tracklr.auth.logout();
```

---

### `register(data)`
Registers a new merchant or business user.

```typescript
const newUser = await tracklr.auth.register({
  email: 'partner@example.com',
  password: 'Password123!',
  first_name: 'David',
  last_name: 'Oshin',
  business_name: 'Zenith Logistics'
});
```

---

### `verify2FA(payload)`
Completes a two-factor authentication challenge.

```typescript
const res = await tracklr.auth.verify2FA({
  email: 'owner@example.com',
  code: '582914'
});
```

---

### `getProfile()`
Retrieves full user profile and associated metadata.

```typescript
const profile = await tracklr.auth.getProfile();
```
