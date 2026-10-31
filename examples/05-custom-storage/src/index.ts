import { StorageAdapter, createTracklrClient } from '@tracklr/sdk';

/**
 * EncryptedFileStorageAdapter
 * Example of a custom asynchronous storage adapter that encrypts/decrypts
 * tokens when persisting them to local storage, secure hardware, or cloud caches.
 */
class EncryptedStorageAdapter implements StorageAdapter {
  private inMemoryDb = new Map<string, string>();
  private xorKey = 42; // Example trivial cipher for demonstration

  private obfuscate(val: string): string {
    const raw = Buffer.from(val).map(b => b ^ this.xorKey);
    return Buffer.from(raw).toString('base64');
  }

  private deobfuscate(val: string): string {
    const raw = Buffer.from(val, 'base64');
    return Buffer.from(raw.map(b => b ^ this.xorKey)).toString('utf-8');
  }

  async getItem(key: string): Promise<string | null> {
    const encrypted = this.inMemoryDb.get(key);
    if (!encrypted) return null;
    const decrypted = this.deobfuscate(encrypted);
    console.log(`[StorageAdapter] Decrypted "${key}" from secure vault.`);
    return decrypted;
  }

  async setItem(key: string, value: string): Promise<void> {
    const encrypted = this.obfuscate(value);
    this.inMemoryDb.set(key, encrypted);
    console.log(`[StorageAdapter] Encrypted & stored "${key}". Ciphertext: ${encrypted.slice(0, 16)}...`);
  }

  async removeItem(key: string): Promise<void> {
    this.inMemoryDb.delete(key);
    console.log(`[StorageAdapter] Purged "${key}" from vault.`);
  }
}

async function runCustomStorageDemo() {
  console.log('=== Tracklr Custom Storage Adapter Demo ===');

  const customVault = new EncryptedStorageAdapter();

  // Initialize client with custom adapter
  const tracklr = createTracklrClient({
    baseUrl: 'https://biz.henotaceai.ng/api/',
    clientPlatform: 'mobile',
    storageAdapter: customVault
  });

  console.log('1. Simulating access token storage...');
  await tracklr.http.setAccessToken('mock_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.token123');
  await tracklr.http.setRefreshToken('mock_refresh_token_xyz987');

  console.log('\n2. Retrieving stored tokens from adapter...');
  const activeAccess = await tracklr.http.getAccessToken();
  console.log(`✓ Active Access Token: ${activeAccess}`);

  console.log('\n3. Purging tokens on logout...');
  await tracklr.http.clearTokens();
  const clearedAccess = await tracklr.http.getAccessToken();
  console.log(`✓ Post-clear token: ${clearedAccess} (null = properly purged)`);

  console.log('\n=== Custom Storage Demo Finished ===');
}

runCustomStorageDemo();
