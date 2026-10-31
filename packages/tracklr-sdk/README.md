# @tracklr/sdk

Unified TypeScript API Client SDK for the **Tracklr Business Suite**.

This is the **single, centralized SDK** shared across all applications in the Tracklr ecosystem:
- 🛒 **Retail Web App** (`retail-web-app`)
- 📱 **Retail Mobile App** (`retail-mobile-app`)
- 🏭 **Production Business** (`production-business`)
- 🔌 Any future 3rd-party integration, CLI, or microservice.

---

## 1. How It Works

Instead of each application writing its own HTTP requests, header logic, and authentication handlers, `@tracklr/sdk` provides a **single source of truth** with:

1. **Automatic Multi-Tenant Headers**:
   - `Authorization: Bearer <token>`
   - `X-Tenant-ID: <id>` (ensures strict multi-tenant isolation)
   - `X-Business-Slug: <slug>`
   - `X-Client-Platform: web | mobile | desktop`
2. **Mutex-Locked Token Refresh**:
   If an access token expires and an endpoint returns `401 Unauthorized`, the SDK intercepts the failure, queues all incoming concurrent requests, refreshes the token once, and replays all pending requests seamlessly.
3. **Pluggable Storage Adapters**:
   Works across Browser (`localStorage`), Mobile (Capacitor Preferences), and Node/Desktop (in-memory or custom storage).

---

## 2. Installation & Workspace Setup

### Within the Tracklr Monorepo (Automatic)
The SDK is pre-configured as an npm workspace package. In any app's `package.json`:

```json
{
  "dependencies": {
    "@tracklr/sdk": "*"
  }
}
```

Whenever you run `npm install` at the root of `Tracklr-business-management`, `@tracklr/sdk` is automatically linked via symlink to all three applications.

### Outside the Monorepo (Standalone / 3rd Party)
If you publish `@tracklr/sdk` to npm or use a tarball / git URL:

```bash
# Using npm
npm install @tracklr/sdk

# Using bun
bun add @tracklr/sdk

# Using yarn
yarn add @tracklr/sdk
```

---

## 3. Quick Start & Initialization

Create a central client instance (e.g. in `src/lib/tracklr.ts` or `src/config/api.ts`):

```typescript
import { createTracklrClient } from '@tracklr/sdk';

export const tracklr = createTracklrClient({
  baseUrl: import.meta.env.VITE_API_URL || 'https://biz.henotaceai.ng/api/',
  clientPlatform: 'web', // 'web' | 'mobile' | 'desktop'
  onUnauthorized: () => {
    // Redirect to login if refresh fails
    window.location.href = '/login';
  }
});
```

---

## 4. Module Guide & Code Examples

### 🔐 Auth Module (`tracklr.auth`)

#### User Login
```typescript
const response = await tracklr.auth.login({
  email: 'owner@example.com',
  password: 'SecurePassword123'
});

console.log('Logged in user:', response.user.first_name);
console.log('Business:', response.business?.name);
```

#### Verify Session (Auto-check on app startup)
```typescript
const { valid, user, business } = await tracklr.auth.verifySession();
if (valid) {
  console.log('Session is active for', user?.email);
}
```

#### Logout
```typescript
await tracklr.auth.logout();
```

---

### 🏢 Tenancy Module (`tracklr.tenancy`)

#### List Businesses Available to the User
```typescript
const businesses = await tracklr.tenancy.listUserBusinesses();
```

#### Switch Active Tenant
```typescript
const result = await tracklr.tenancy.switchBusiness(businessId);
console.log('Active business switched to:', result.business.name);
```

---

### 🛒 Retail Module (`tracklr.retail`)

Used by **Retail Web App** and **Retail Mobile App**:

#### Fetch Products
```typescript
const products = await tracklr.retail.getProducts({ category: 'Beverages' });
```

#### Create a POS Sale Transaction
```typescript
const receipt = await tracklr.retail.createSale({
  business_id: 1,
  items: [
    { product_id: 101, product_name: 'Item A', quantity: 2, unit_price: 1500, total_price: 3000 }
  ],
  total_amount: 3000,
  payment_method: 'cash'
});
```

#### Query Sales History
```typescript
const sales = await tracklr.retail.getSalesHistory({ limit: 50 });
```

---

### 🏭 Production Module (`tracklr.production`)

Used by **Production Business**:

#### List Production Batches
```typescript
const batches = await tracklr.production.getBatches({ status: 'in_progress' });
```

#### Create New Production Batch
```typescript
const newBatch = await tracklr.production.createBatch({
  batch_number: 'BATCH-2026-001',
  recipe_id: 5,
  quantity_to_produce: 100,
  start_date: new Date().toISOString()
});
```

#### Update Batch Status
```typescript
await tracklr.production.updateBatchStatus(newBatch.id, 'completed', {
  actual_yield: 98
});
```

#### Record Production Waste
```typescript
await tracklr.production.recordWaste({
  batch_id: newBatch.id,
  quantity: 2,
  reason: 'Spillage during bottling'
});
```

---

## 5. Development & Building

To recompile the SDK after making code changes:

```bash
# From workspace root:
npm run build:sdk

# Or inside packages/tracklr-sdk/:
cd packages/tracklr-sdk
npm run build
```

This compiles TypeScript source files in `src/` to ES modules and `.d.ts` declaration files in `dist/`.
