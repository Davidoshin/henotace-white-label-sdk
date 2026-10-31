---
id: configuration
title: Client Configuration & Options
sidebar_label: Configuration
sidebar_position: 3
---

# Client Configuration & Options

The core client is instantiated using `createTracklrClient()` or `new TracklrClient()`.

---

## 1. Quick Initialization

```typescript title="src/lib/tracklr.ts"
import { createTracklrClient } from '@tracklr/sdk';

export const tracklr = createTracklrClient({
  baseUrl: 'https://biz.henotaceai.ng/api/',
  clientPlatform: 'web', // 'web' | 'mobile' | 'desktop'
  onUnauthorized: () => {
    // Automatically redirect on session expiration
    window.location.href = '/login';
  }
});
```

---

## 2. Configuration Options Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `baseUrl` | `string` | `'https://biz.henotaceai.ng/api/'` | Target backend REST API endpoint. |
| `tenantId` | `string \| number` | `undefined` | Active tenant ID (`X-Tenant-ID` header). |
| `businessSlug` | `string` | `undefined` | Active business slug (`X-Business-Slug` header). |
| `clientPlatform` | `'web' \| 'mobile' \| 'desktop'` | `'web'` | Injected into the `X-Client-Platform` header. |
| `storageAdapter` | `StorageAdapter` | Browser `localStorage` | Token persistence mechanism. |
| `onUnauthorized` | `() => void` | `undefined` | Callback invoked if token refresh fails permanently. |

---

## 3. Dynamic Tenancy Switching

You can switch the active tenant context at runtime without recreating the client instance:

```typescript
// Set active tenant ID
tracklr.setTenantId('12');

// Set active business slug
tracklr.setBusinessSlug('zenith-bakery');

// Set custom API key (for server-to-server calls)
tracklr.setApiKey('sec_live_98a7sd8f7a6');
```

---

## 4. Mutex-Locked Token Refreshing

`@tracklr/sdk` contains a built-in mutex lock to prevent concurrent refresh storms:

```text
Request A (401) ──┐
Request B (401) ──┼──► [ Mutex Lock Acquired ] ──► POST /api/auth/token/refresh/
Request C (401) ──┘           │                                 │
                              ▼                                 ▼
                     (Requests A, B, C queued)         (New Access Token)
                                                                │
                                                                ▼
                      [ Requests A, B, C re-dispatched with new Bearer Token ]
```

Developers do not need to write retry logic or catch 401 exceptions in user interfaces.
