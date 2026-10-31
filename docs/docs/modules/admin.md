---
id: admin
title: AdminModule
sidebar_label: Platform Administration
sidebar_position: 8
---

# AdminModule (`tracklr.admin`)

The `AdminModule` gives white-label partners and super-administrators dedicated management capabilities for scoped business tenants, Flutterwave payment gateways, custom plan pricing, manual wallet credits, customer error logs, and delivery fleet configurations.

---

## Submodules

- `tracklr.admin.platform`: Tenant scoping, subscriptions, manual wallet credit, payment gateways, and custom plan pricing.
- `tracklr.admin.customerErrors`: Customer exception logging and troubleshooting.
- `tracklr.admin.delivery`: Delivery fleet pricing rules, zones, and orders.
- `tracklr.admin.emailVerifications`: Manual verification overrides and OTP generation.

---

## Methods

### `platform.getBusinesses(params?)`
Fetches all tenant businesses registered under this white-label partner.

```typescript
const tenants = await tracklr.admin.platform.getBusinesses({
  search: 'Zenith',
  is_active: true
});
```

---

### `platform.creditWallet(payload)`
Directly credits a customer wallet with a mandatory audit note and transaction ledger entry.

```typescript
await tracklr.admin.platform.creditWallet({
  business_id: 14,
  amount: 25000,
  reason: 'Partner manual deposit credit - Verified Bank Slip #9021',
  notify_user: true
});
```

---

### `platform.saveSettings(settings)`
Configures white-label payment gateway API keys (e.g. Flutterwave live & test keys) and partner banking details.

```typescript
await tracklr.admin.platform.saveSettings({
  flutterwave_public_key: 'FLWPUBK-xxxxxxxxxxxx',
  flutterwave_secret_key: 'FLWSECK-xxxxxxxxxxxx',
  flutterwave_encryption_key: 'FLWENCR-xxxxxxxxx',
  is_live: true
});
```

---

### `platform.savePlanPricing(pricingPayload)`
Adjusts subscription rates across Monthly, Quarterly, and Annual billing cycles for `Starter`, `Pro`, and `Enterprise` tiers.

```typescript
await tracklr.admin.platform.savePlanPricing({
  starter: { monthly: 5000, quarterly: 14000, yearly: 50000 },
  pro: { monthly: 15000, quarterly: 42000, yearly: 150000 },
  enterprise: { monthly: 35000, quarterly: 98000, yearly: 350000 }
});
```
