# Henotace & Tracklr White-Label SDK

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue.svg)](https://www.typescriptlang.org/)
[![Docusaurus](https://img.shields.io/badge/Docs-Docusaurus_v3-green.svg)](https://docusaurus.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Unified TypeScript API Client SDK, Docusaurus Documentation Portal, and Real-World Examples Suite for the Henotace & Tracklr White-Label Business Management Platform.

---

## 📦 Repository Structure

```text
henotace-white-label-sdk/
├── packages/
│   └── tracklr-sdk/              # Core TypeScript API client (@tracklr/sdk)
│       ├── src/                  # 16 Typed Domain Modules
│       │   ├── auth.ts           # Login, 2FA, session verification, token refresh
│       │   ├── tenancy.ts        # Business listing, tenant switching, dashboard
│       │   ├── retail.ts         # POS checkout, sales history, Z-Report
│       │   ├── production.ts     # Batches, recipes, BOM, waste, cost accounting
│       │   ├── inventory.ts      # Stock valuation, adjustments, history
│       │   ├── finance.ts        # Chart of accounts, journals, ledgers
│       │   ├── staff.ts          # RBAC, clock in/out, attendance, absences
│       │   ├── admin.ts          # White-label partner scoping, pricing, Flutterwave
│       │   ├── customer.ts       # CRM, customer directory, loyalty
│       │   ├── delivery.ts       # Dispatch orders, rider tracking
│       │   ├── departments.ts    # Departmental units & organizational hierarchy
│       │   ├── suppliers.ts      # Vendors & purchase requisitions
│       │   ├── services.ts       # Service appointments & booking calendar
│       │   ├── insurance.ts      # Policy registry & claims
│       │   ├── education.ts      # Student registry & tuition billing
│       │   ├── client.ts         # High-performance HTTP client engine
│       │   └── types.ts          # Shared TypeScript type definitions
│       └── dist/                 # Compiled JavaScript and .d.ts files
│
├── docs/                         # Docusaurus v3 Documentation Portal
│   ├── docs/                     # Comprehensive architecture and API references
│   │   ├── intro.md              # Architecture & Getting Started
│   │   ├── installation.md       # Installation guide
│   │   ├── configuration.md      # Client config, headers, mutex refresh
│   │   ├── storage-adapters.md   # Storage adapters (Web, Capacitor, Node)
│   │   ├── examples-overview.md  # Overview of runnable examples
│   │   └── modules/              # 16 Individual Module Reference Guides
│   ├── src/                      # Custom React components and landing hero
│   └── docusaurus.config.ts      # Docusaurus configuration
│
└── examples/                     # Standalone Runnable TypeScript Workflows
    ├── 01-quickstart-node/       # Client init, login, tenant switching
    ├── 02-retail-pos-checkout/   # Full POS sale, item calculation, receipt
    ├── 03-production-lifecycle/  # Recipe BOM, batch creation, waste, yield
    ├── 04-whitelabel-admin/      # Scoped tenants, manual wallet credit, settings
    └── 05-custom-storage/        # Custom token storage adapter
```

---

## 🚀 Quick Start

### 1. Installation

Install within a monorepo workspace:
```json
{
  "dependencies": {
    "@tracklr/sdk": "*"
  }
}
```

Or via npm:
```bash
npm install @tracklr/sdk
```

### 2. Client Initialization

```typescript
import { createTracklrClient } from '@tracklr/sdk';

export const client = createTracklrClient({
  baseUrl: 'https://biz.henotaceai.ng/api/',
  clientPlatform: 'web', // 'web' | 'mobile' | 'desktop'
  onUnauthorized: () => {
    window.location.href = '/login';
  }
});
```

### 3. Authenticate & Query Data

```typescript
// Login
const { user, business } = await client.auth.login({
  email: 'merchant@example.com',
  password: 'SecurePassword123'
});

// Fetch Retail Products with multi-tenant isolation
const products = await client.retail.getProducts({ category: 'Beverages' });

// Create POS Sale Transaction
const receipt = await client.retail.createSale({
  business_id: business.id,
  items: [
    { product_id: products[0].id, quantity: 2, unit_price: 1500, total_price: 3000 }
  ],
  total_amount: 3000,
  payment_method: 'cash'
});
```

---

## 📖 Documentation Portal (Docusaurus)

To run the local documentation server:
```bash
npm run dev:docs
```

To build static production documentation:
```bash
npm run build:docs
```

---

## 🧪 Runnable Examples

Each example in `examples/` is fully typed and standalone:
```bash
cd examples/01-quickstart-node
npm install
npm start
```

---

## 🛠️ Building the SDK

To recompile the TypeScript SDK:
```bash
npm run build:sdk
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
