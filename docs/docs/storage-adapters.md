---
id: storage-adapters
title: Storage & Platform Adapters
sidebar_label: Storage Adapters
sidebar_position: 4
---

# Storage & Platform Adapters

`@tracklr/sdk` is environment-agnostic. It persists access and refresh tokens via pluggable `StorageAdapter` implementations.

---

## 1. StorageAdapter Interface

```typescript
export interface StorageAdapter {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}
```

---

## 2. Web Browser Adapter (Default)

In standard browser environments, `@tracklr/sdk` defaults to `window.localStorage`:

```typescript
import { createTracklrClient } from '@tracklr/sdk';

const tracklr = createTracklrClient({
  clientPlatform: 'web'
  // Automatically uses localStorage
});
```

---

## 3. Mobile Capacitor Adapter (`retail-mobile-app`)

In native mobile environments (Android / iOS), Capacitor Preferences provides durable native key-value storage:

```typescript title="src/lib/mobileStorage.ts"
import { Preferences } from '@capacitor/preferences';
import { StorageAdapter, createTracklrClient } from '@tracklr/sdk';

export const capacitorStorageAdapter: StorageAdapter = {
  async getItem(key: string): Promise<string | null> {
    const { value } = await Preferences.get({ key });
    return value;
  },
  async setItem(key: string, value: string): Promise<void> {
    await Preferences.set({ key, value });
  },
  async removeItem(key: string): Promise<void> {
    await Preferences.remove({ key });
  }
};

export const mobileTracklr = createTracklrClient({
  baseUrl: 'https://biz.henotaceai.ng/api/',
  clientPlatform: 'mobile',
  storageAdapter: capacitorStorageAdapter
});
```

---

## 4. Node.js / Server-side Storage

For Node.js background jobs or microservices where `localStorage` does not exist:

### In-Memory Storage Adapter
```typescript
class InMemoryStorageAdapter implements StorageAdapter {
  private map = new Map<string, string>();

  getItem(key: string): string | null {
    return this.map.get(key) || null;
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
}
```

See [Example 05: Custom Storage Adapter](./examples-overview.md) for complete runnable code.
