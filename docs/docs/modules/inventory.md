---
id: inventory
title: InventoryModule
sidebar_label: Inventory & Stock
sidebar_position: 5
---

# InventoryModule (`tracklr.inventory`)

The `InventoryModule` handles inventory valuation, historical stock ledger audits, transfers between branches, spoilage records, and threshold replenishment alerts.

---

## Methods

### `getSummary(params?)`
Fetches stock valuation summaries, total SKUs, low-stock warnings, and out-of-stock items.

```typescript
const summary = await tracklr.inventory.getSummary({ branch_id: 2 });
console.log('Total Asset Valuation:', summary.total_value);
console.log('Items Requiring Restock:', summary.low_stock_count);
```

---

### `getStockHistory(params?)`
Retrieves chronological stock change logs across all products (sales, restocks, adjustments, transfers).

```typescript
const history = await tracklr.inventory.getStockHistory({
  start_date: '2026-10-01',
  page: 1
});
```

---

### `getProductStockHistory(productId, params?)`
Retrieves the audit trail for a single SKU.

```typescript
const auditTrail = await tracklr.inventory.getProductStockHistory(101);
```

---

### `recordSpoilage(data)`
Records damaged, expired, or spoiled merchandise, deducting it from stock with an attached reason.

```typescript
await tracklr.inventory.recordSpoilage({
  product_id: 101,
  quantity: 3,
  reason: 'Glass jar broken during shelf stocking'
});
```
