---
id: tenancy
title: TenancyModule
sidebar_label: Tenancy & Switching
sidebar_position: 2
---

# TenancyModule (`tracklr.tenancy`)

The `TenancyModule` provides multi-business management, tenant context switching, dashboard aggregates, subscription limit checks, and business settings.

---

## Methods

### `listUserBusinesses()`
Retrieves all businesses and branches that the authenticated user has access to.

```typescript
const businesses = await tracklr.tenancy.listUserBusinesses();
businesses.forEach(b => {
  console.log(`${b.id}: ${b.name} (${b.business_category})`);
});
```

---

### `switchBusiness(businessId)`
Switches the active business tenant. Automatically updates the HTTP engine's `X-Tenant-ID` header and stores the new tenant token.

```typescript
const result = await tracklr.tenancy.switchBusiness(14);

if (result.success) {
  console.log('Now managing:', result.business.name);
}
```

---

### `getCurrentBusiness()`
Fetches detailed profile information for the currently active tenant.

```typescript
const activeBusiness = await tracklr.tenancy.getCurrentBusiness();
```

---

### `getDashboard(branchId?)`
Fetches high-level executive metrics (total sales, revenue, outstanding receivables, expenses, active staff) for a specific branch or the entire business.

```typescript
// All branches
const overallStats = await tracklr.tenancy.getDashboard();

// Specific branch
const branchStats = await tracklr.tenancy.getDashboard(3);
```

---

### `checkLimits(resource)`
Checks if the current tenant has reached their plan quota for a given resource (`staff`, `products`, `invoices`, `branches`).

```typescript
const quota = await tracklr.tenancy.checkLimits('products');
if (quota.is_limit_reached) {
  alert('Please upgrade your Tracklr plan to add more products.');
}
```

---

### `getNotifications(params?)` & `markNotificationRead(id)`
Retrieves and updates merchant alerts, low stock warnings, and transaction notices.

```typescript
const alerts = await tracklr.tenancy.getNotifications({ unread_only: true });
await tracklr.tenancy.markNotificationRead(alerts.results[0].id);
```
