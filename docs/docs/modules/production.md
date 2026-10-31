---
id: production
title: ProductionModule
sidebar_label: Manufacturing & Production
sidebar_position: 4
---

# ProductionModule (`tracklr.production`)

The `ProductionModule` provides manufacturing facilities, bakeries, bottling plants, and processing businesses with end-to-end recipe costing, batch tracking, raw material consumption, scrap/waste logs, and finished goods reconciliation.

---

## Methods

### `getBatches(params?)`
Fetches production batches filtered by status (`planned`, `in_progress`, `completed`, `cancelled`).

```typescript
const activeBatches = await tracklr.production.getBatches({
  status: 'in_progress'
});
```

---

### `createBatch(batchPayload)`
Initiates a new manufacturing batch run, calculating required ingredients and raw materials from the linked recipe.

```typescript
const newBatch = await tracklr.production.createBatch({
  batch_number: 'BATCH-2026-104',
  recipe_id: 12,
  quantity_to_produce: 500,
  start_date: new Date().toISOString(),
  assigned_to: 4
});
```

---

### `updateBatchStatus(batchId, status, details?)`
Transitions a batch between states and logs actual yield vs. expected yield.

```typescript
await tracklr.production.updateBatchStatus(newBatch.id, 'completed', {
  actual_yield: 492,
  completion_notes: 'Successful run with 8 units variance due to filling line calibration.'
});
```

---

### `recordWaste(wastePayload)`
Logs raw material waste, scrap, or spillage linked directly to a batch and expense ledger.

```typescript
await tracklr.production.recordWaste({
  batch_id: newBatch.id,
  material_id: 38,
  quantity: 5.5,
  unit: 'kg',
  reason: 'Bag tear during mixing hopper intake'
});
```

---

### `getRecipes()` & `createRecipe(recipe)`
Manages recipes, Bill of Materials (BOM), ingredient ratios, and labor overhead costs.

```typescript
const recipe = await tracklr.production.createRecipe({
  name: 'Vanilla Wafer 250g',
  output_quantity: 100,
  output_unit: 'packs',
  ingredients: [
    { material_id: 1, quantity: 20, unit: 'kg' },
    { material_id: 2, quantity: 10, unit: 'kg' }
  ],
  labor_cost_per_unit: 50
});
```

---

### `getFinishedGoods()` & `getRawMaterials()`
Inspects raw material stock levels and inventories of newly manufactured finished goods.

```typescript
const materials = await tracklr.production.getRawMaterials();
const finishedStock = await tracklr.production.getFinishedGoods();
```
