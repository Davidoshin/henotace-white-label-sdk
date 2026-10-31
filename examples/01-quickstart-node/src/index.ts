import { createTracklrClient, StorageAdapter } from '@tracklr/sdk';

// In-Memory Storage Adapter for Node.js process lifecycle
class NodeMemoryStorage implements StorageAdapter {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) || null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
}

async function runQuickstart() {
  console.log('--- Tracklr SDK: Quickstart Demo ---');

  // 1. Initialize client
  const tracklr = createTracklrClient({
    baseUrl: process.env.TRACKLR_API_URL || 'https://biz.henotaceai.ng/api/',
    clientPlatform: 'desktop',
    storageAdapter: new NodeMemoryStorage(),
    onUnauthorized: () => {
      console.warn('⚠️ Session expired! Need re-login.');
    }
  });

  console.log('✓ TracklrClient successfully initialized.');

  // 2. Authentication credentials
  const email = process.env.TRACKLR_USER_EMAIL || 'demo@tracklr.app';
  const password = process.env.TRACKLR_USER_PASSWORD || 'TracklrSecret123';

  console.log(`Authenticating as: ${email}...`);

  try {
    const authRes = await tracklr.auth.login({ email, password });
    console.log(`✓ Login Successful!`);
    console.log(`  User: ${authRes.user?.first_name} ${authRes.user?.last_name}`);
    console.log(`  Default Tenant: ${authRes.business?.name} (ID: ${authRes.business?.id})`);

    // 3. Tenancy Module - List accessible businesses
    const businesses = await tracklr.tenancy.listUserBusinesses();
    console.log(`\nAccessible Businesses (${businesses.length}):`);
    businesses.forEach((b: any) => {
      console.log(`  - [ID: ${b.id}] ${b.name} (${b.business_category})`);
    });

    // 4. Switch context if multiple businesses exist
    if (businesses.length > 1) {
      const targetId = businesses[1].id;
      console.log(`\nSwitching tenant context to business ID: ${targetId}...`);
      const switchRes = await tracklr.tenancy.switchBusiness(targetId);
      console.log(`✓ Context active for: ${switchRes.business?.name}`);
    }

    // 5. Verify active session
    const session = await tracklr.auth.verifySession();
    console.log(`\n✓ Session active: ${session.valid} (User: ${session.user?.email})`);
    
  } catch (err: any) {
    console.log('Notice: Running in demo mode without live network credentials.');
    console.log('Result:', err.message || err);
  }

  console.log('\n--- Quickstart Finished Successfully ---');
}

runQuickstart();
