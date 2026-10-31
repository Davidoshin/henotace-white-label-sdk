# Example 03: Manufacturing Production Batch Lifecycle

Demonstrates how manufacturing and processing enterprises track recipes, BOM costs, batch runs, waste logs, and finished goods inventory with `@tracklr/sdk`:
1. Authenticating a production supervisor.
2. Querying recipes, ingredients, and calculating cost per unit.
3. Creating a new batch run with `tracklr.production.createBatch()`.
4. Updating batch status and deducting consumed raw materials.
5. Logging scrap/waste events with `tracklr.production.recordWaste()`.
6. Finalizing batch completion and computing yield efficiency.

---

## How to Run

```bash
npm install
npm start
```
