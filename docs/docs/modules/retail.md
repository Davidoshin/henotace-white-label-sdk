---
id: retail
title: RetailModule
sidebar_label: Retail & POS
sidebar_position: 3
---

# RetailModule (`tracklr.retail`)

The `RetailModule` powers the retail checkout experience, product catalogs, barcode lookups, POS orders, and Z-report daily reconciliations across `retail-web-app` and `retail-mobile-app`.

---

## Methods

### `getProducts(params?, options?)`
Fetches catalog products with pagination, category filtering, search terms, and branch scoping.

```typescript
const products = await tracklr.retail.getProducts({
  search: 'Coca Cola',
  category: 'Beverages',
  page: 1,
  page_size: 20
});
```

---

### `createSale(salePayload, options?)`
Submits a POS sale transaction. Supports cash, POS card, split tender, and credit payment methods.

```typescript
const saleReceipt = await tracklr.retail.createSale({
  business_id: 1,
  items: [
    {
      product_id: 101,
      product_name: 'Almond Milk 1L',
      quantity: 2,
      unit_price: 2500,
      total_price: 5000
    }
  ],
  total_amount: 5000,
  amount_paid: 5000,
  payment_method: 'cash',
  customer_name: 'Walk-in Customer'
});
```

---

### `getZReport(branchId?)`
Generates end-of-day Z-Report reconciliation data for cashiers and store managers.

```typescript
const zReport = await tracklr.retail.getZReport(currentBranchId);
console.log('Total Cash Sales:', zReport.total_cash);
console.log('Total POS Card Sales:', zReport.total_pos);
console.log('Gross Revenue:', zReport.gross_total);
```

---

### `getSales(params?, options?)`
Queries sales history with date ranges, cashier filters, and export flags.

```typescript
const sales = await tracklr.retail.getSales({
  start_date: '2026-10-01',
  end_date: '2026-10-31',
  page: 1
});
```

---

### `createProduct(product)` & `updateProduct(id, updates)`
Manages product listings, barcodes, selling prices, and reorder levels.

```typescript
const newProduct = await tracklr.retail.createProduct({
  name: 'Organic Honey 500g',
  barcode: '8901234567890',
  selling_price: 3500,
  cost_price: 2400,
  quantity_in_stock: 45
});
```
