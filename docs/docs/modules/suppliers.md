---
id: suppliers
title: SuppliersModule
sidebar_label: Suppliers & Vendors
sidebar_position: 12
---

# SuppliersModule (`tracklr.suppliers`)

The `SuppliersModule` handles external vendor directories, supply contracts, purchase orders, and payable balances.

---

## Methods

### `getSuppliers(params?)`
Fetches vendor records with category filters and contact info.

```typescript
const suppliers = await tracklr.suppliers.getSuppliers();
```

### `createSupplier(supplierData)`
Registers a new raw material or merchandise vendor.

```typescript
const vendor = await tracklr.suppliers.createSupplier({
  company_name: 'Flour Mills of Nigeria',
  contact_person: 'Adeola Johnson',
  phone: '08023456789',
  email: 'orders@fmn.com',
  payment_terms: 'net_30'
});
```

### `getPurchaseOrders(supplierId?)`
Lists purchase requisitions and supplier deliveries.

```typescript
const orders = await tracklr.suppliers.getPurchaseOrders(vendor.id);
```
