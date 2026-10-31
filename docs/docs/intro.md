---
id: intro
title: Introduction & Architecture
sidebar_label: Introduction
sidebar_position: 1
---

# Introduction & Architecture

Welcome to the **@tracklr/sdk** documentation. 

`@tracklr/sdk` is the official TypeScript API Client SDK powering the entire **Tracklr Business Suite**:
- 🛒 **Retail Web App** (`retail-web-app`)
- 📱 **Retail Mobile App** (`retail-mobile-app` via Capacitor)
- 🏭 **Production Business** (`production-business`)
- 🔌 **3rd-Party Integrations & Automation Scripts**

---

## Why `@tracklr/sdk`?

In multi-application, multi-tenant architectures, applications frequently drift if each manages its own HTTP calls, authentication states, and platform-specific headers. `@tracklr/sdk` solves this by providing:

1. **Strict Multi-Tenant Scoping**:
   Every request automatically injects:
   - `Authorization: Bearer <accessToken>`
   - `X-Tenant-ID: <businessId>`
   - `X-Business-Slug: <slug>`
   - `X-Client-Platform: web | mobile | desktop`

2. **Zero-Race Mutex Token Refresh**:
   When an access token expires and an API call triggers `401 Unauthorized`:
   - The SDK locks outgoing refreshes with a thread-safe mutex.
   - All incoming concurrent API requests are paused and placed into an in-memory queue.
   - A single token refresh request is dispatched to `/api/auth/token/refresh/`.
   - Once refreshed, all queued requests are updated with the new token and replayed seamlessly.

3. **Pluggable Storage Adapters**:
   Seamlessly run anywhere:
   - **Browser**: uses `localStorage`.
   - **Capacitor Mobile**: uses Capacitor Preferences or Secure Storage.
   - **Node.js**: uses in-memory or custom Redis token storage.

4. **16 Typed Business Modules**:
   Full auto-completion and compile-time type validation across Retail, Manufacturing, Inventory, Accounts, and RBAC.

---

## Architectural Diagram

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Tracklr Client Applications                     │
│  [Retail Web App]       [Retail Mobile App]      [Production Business] │
└─────────┬─────────────────────────┬─────────────────────────┬──────────┘
          │                         │                         │
          └─────────────────────────┼─────────────────────────┘
                                    ▼
                   ┌───────────────────────────────────┐
                   │           @tracklr/sdk            │
                   │  ┌─────────────────────────────┐  │
                   │  │ TracklrClient (Facade)      │  │
                   │  ├─────────────────────────────┤  │
                   │  │ 16 Typed Business Modules   │  │
                   │  │ (Auth, Retail, Production,  │  │
                   │  │  Finance, Staff, Admin...)  │  │
                   │  ├─────────────────────────────┤  │
                   │  │ HttpClient (Engine)         │  │
                   │  │  - Header Injectors         │  │
                   │  │  - Mutex Refresh Queue      │  │
                   │  │  - Pluggable Storage Adapter│  │
                   │  └─────────────────────────────┘  │
                   └─────────────────┬─────────────────┘
                                     │ (JSON / HTTPS)
                                     ▼
                   ┌───────────────────────────────────┐
                   │      Tracklr Backend Services     │
                   │       https://biz.henotaceai.ng   │
                   └───────────────────────────────────┘
```

---

## Quick Navigation

- [Installation Guide](./installation.md) - How to install within the monorepo or standalone.
- [Configuration](./configuration.md) - Setting up client endpoints, platform headers, and hooks.
- [Storage Adapters](./storage-adapters.md) - Configuring web, mobile, and Node storage.
- [API Modules](./modules/auth.md) - Explore all 16 client domain modules.
- [Runnable Examples](./examples-overview.md) - Working code scripts you can execute immediately.
