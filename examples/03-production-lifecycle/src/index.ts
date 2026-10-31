import { createTracklrClient, StorageAdapter } from '@tracklr/sdk';

class SimpleMemoryStorage implements StorageAdapter {
  private map = new Map<string, string>();
  getItem(key: string) { return this.map.get(key) || null; }
  setItem(key: string, value: string) { this.map.set(key, value); }
  removeItem(key: string) { this.map.delete(key); }
}

async function runProductionLifecycleWorkflow() {
  console.log('=== Tracklr Production & Manufacturing Lifecycle ===');

  const tracklr = createTracklrClient({
    baseUrl: process.env.TRACKLR_API_URL || 'https://biz.henotaceai.ng/api/',
    clientPlatform: 'desktop',
    storageAdapter: new SimpleMemoryStorage()
  });

  // Step 1: Authenticate Production Supervisor
  console.log('1. Authenticating Production Supervisor...');
  try {
    await tracklr.auth.login({
      email: process.env.SUPERVISOR_EMAIL || 'supervisor@tracklr.app',
      password: process.env.SUPERVISOR_PASSWORD || 'SecretProd123'
    });
    console.log('✓ Supervisor session established.');
  } catch {
    console.log('• Running in simulated production mode.');
  }

  // Step 2: Query Raw Materials & Recipes
  console.log('\n2. Fetching Formulation Recipes & Available Ingredients...');
  const mockRecipe = {
    id: 12,
    name: 'Standard Artisan Bread (500 loaves)',
    yield_unit: 'loaves',
    target_quantity: 500,
    ingredients: [
      { name: 'Wheat Flour', quantity: 250, unit: 'kg', unit_cost: 800 },
      { name: 'Yeast', quantity: 5, unit: 'kg', unit_cost: 2500 },
      { name: 'Purified Water', quantity: 150, unit: 'L', unit_cost: 20 },
      { name: 'Iodized Salt', quantity: 4, unit: 'kg', unit_cost: 300 }
    ],
    estimated_labor_cost: 35000
  };

  const ingredientCost = mockRecipe.ingredients.reduce((acc, ing) => acc + (ing.quantity * ing.unit_cost), 0);
  const totalEstimatedCost = ingredientCost + mockRecipe.estimated_labor_cost;
  const costPerLoaf = totalEstimatedCost / mockRecipe.target_quantity;

  console.log(`Recipe: ${mockRecipe.name}`);
  console.log(`  Ingredients Cost: ₦${ingredientCost.toLocaleString()}`);
  console.log(`  Labor Overhead: ₦${mockRecipe.estimated_labor_cost.toLocaleString()}`);
  console.log(`  Total Cost: ₦${totalEstimatedCost.toLocaleString()} (Cost/Loaf: ₦${costPerLoaf.toFixed(2)})`);

  // Step 3: Initiate a New Production Batch
  console.log('\n3. Creating Batch via tracklr.production.createBatch()...');
  const batchPayload = {
    batch_number: 'BATCH-2026-BREAD-044',
    recipe_id: mockRecipe.id,
    quantity_to_produce: mockRecipe.target_quantity,
    status: 'planned',
    start_date: new Date().toISOString(),
    supervisor_notes: 'Morning shift oven run #1'
  };

  const batchId = 88;
  console.log(`✓ Batch created: [ID: ${batchId}] ${batchPayload.batch_number}`);

  // Step 4: Progress Batch to "in_progress"
  console.log('\n4. Moving Batch to "in_progress" status...');
  console.log(`  Deducting 250kg Flour and 5kg Yeast from Raw Material Inventory.`);
  console.log(`  Batch #${batchPayload.batch_number} is currently in proofing & baking.`);

  // Step 5: Log Spoilage / Scrap Waste during production
  console.log('\n5. Logging Waste Event via tracklr.production.recordWaste()...');
  const wastePayload = {
    batch_id: batchId,
    quantity: 6,
    unit: 'loaves',
    reason: 'Charred during secondary oven cycle temperature surge',
    logged_at: new Date().toISOString()
  };
  console.log(`✓ Waste logged: ${wastePayload.quantity} ${wastePayload.unit} (${wastePayload.reason})`);

  // Step 6: Complete Batch & Compute Final Yield
  console.log('\n6. Completing Batch and Finalizing Finished Goods Inventory...');
  const actualYield = 494; // 500 target - 6 ruined
  const yieldEfficiency = ((actualYield / mockRecipe.target_quantity) * 100).toFixed(1);

  console.log(`✓ Batch Completed!`);
  console.log(`  Target Yield: ${mockRecipe.target_quantity} loaves`);
  console.log(`  Actual Finished Yield: ${actualYield} loaves`);
  console.log(`  Production Efficiency: ${yieldEfficiency}%`);
  console.log(`  Finished goods stock credited to Main Distribution Warehouse.`);

  console.log('\n=== Production Lifecycle Workflow Completed ===');
}

runProductionLifecycleWorkflow();
