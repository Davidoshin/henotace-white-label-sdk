import {
  TracklrClientConfig,
  StorageAdapter,
  ApiError
} from './types.js';

class MemoryStorage implements StorageAdapter {
  private store: Map<string, string> = new Map();

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

export class HttpClient {
  private baseUrl: string;
  private tenantId?: string;
  private businessSlug?: string;
  private apiKey?: string;
  private clientPlatform: 'web' | 'mobile' | 'desktop';
  private storage: StorageAdapter;
  private onUnauthorized?: () => void;
  private onTokenRefreshed?: (newToken: string) => void;
  private onError?: (endpoint: string, method: string, status: number, message: string, extra?: Record<string, unknown>) => void;
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor(config: TracklrClientConfig = {}) {
    let base = config.baseUrl || 'https://biz.henotaceai.ng/api/';
    base = base.trim().replace(/\/+$/, '');
    if (!base.endsWith('/api')) {
      base = `${base}/api`;
    }
    this.baseUrl = `${base}/`;

    this.tenantId = config.tenantId || 'tracklr';
    this.businessSlug = config.businessSlug;
    this.apiKey = config.apiKey;
    this.clientPlatform = config.clientPlatform || 'web';
    this.onUnauthorized = config.onUnauthorized;
    this.onTokenRefreshed = config.onTokenRefreshed;
    this.onError = config.onError;

    const customStorage = config.storage || config.storageAdapter;
    if (customStorage) {
      this.storage = customStorage;
    } else if (typeof window !== 'undefined' && window.localStorage) {
      this.storage = {
        getItem: (k) => window.localStorage.getItem(k),
        setItem: (k, v) => window.localStorage.setItem(k, v),
        removeItem: (k) => window.localStorage.removeItem(k),
      };
    } else {
      this.storage = new MemoryStorage();
    }
  }

  public setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }

  public setBusinessSlug(slug: string): void {
    this.businessSlug = slug;
  }

  public setApiKey(apiKey?: string | null): void {
    this.apiKey = apiKey || undefined;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public buildUrl(endpoint: string): string {
    let cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    if (this.baseUrl.endsWith('/api/') && cleanEndpoint.startsWith('api/')) {
      cleanEndpoint = cleanEndpoint.slice(4);
    }
    return `${this.baseUrl}${cleanEndpoint}`;
  }

  public async getAccessToken(): Promise<string | null> {
    return (await this.storage.getItem('accessToken')) || (await this.storage.getItem('securityToken'));
  }

  public async setAccessToken(token: string): Promise<void> {
    await this.storage.setItem('accessToken', token);
  }

  public async getRefreshToken(): Promise<string | null> {
    return (await this.storage.getItem('refreshToken')) || (await this.storage.getItem('securityRefreshToken'));
  }

  public async setRefreshToken(token: string): Promise<void> {
    await this.storage.setItem('refreshToken', token);
  }

  public async clearTokens(): Promise<void> {
    await this.storage.removeItem('accessToken');
    await this.storage.removeItem('refreshToken');
    await this.storage.removeItem('securityToken');
    await this.storage.removeItem('securityRefreshToken');
    await this.storage.removeItem('user');
    await this.storage.removeItem('business');
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }

  public async request<T = unknown>(
    endpoint: string,
    options: RequestInit & { requiresAuth?: boolean; timeout?: number } = {}
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const requiresAuth = options.requiresAuth !== false;
    const method = options.method || 'GET';

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'X-Partner-Code': this.tenantId || 'tracklr',
      'X-Tenant-ID': this.tenantId || 'tracklr',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.clientPlatform && this.clientPlatform !== 'web') {
      headers['X-Client-Platform'] = this.clientPlatform;
    }

    if (options.body != null && !(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.businessSlug) {
      headers['X-Business-Slug'] = this.businessSlug;
    }

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
      headers['X-Developer-API-Key'] = this.apiKey;
    }

    if (requiresAuth) {
      const token = await this.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    let signal = options.signal;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (!signal && options.timeout) {
      if (typeof AbortSignal !== 'undefined' && typeof (AbortSignal as any).timeout === 'function') {
        signal = (AbortSignal as any).timeout(options.timeout);
      } else {
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), options.timeout);
        signal = controller.signal;
      }
    }

    const { requiresAuth: _reqAuth, timeout: _to, ...cleanFetchOptions } = options;
    const fetchOptions: RequestInit = {
      ...cleanFetchOptions,
      headers,
      signal,
      credentials: options.credentials || 'include',
    };

    let response: Response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (networkErr: any) {
      if (timeoutId) clearTimeout(timeoutId);
      if (this.onError) {
        this.onError(endpoint, method, 0, networkErr.message || 'Network error', { url });
      }
      const err: ApiError = {
        message: networkErr.name === 'AbortError'
          ? `Request timeout after ${options.timeout}ms`
          : 'Network connection failure. Please check your internet connection.',
        isNetworkError: true,
        data: networkErr,
      };
      throw err;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }

    // Handle 401 Unauthorized with token refresh mutex
    if (response.status === 401 && requiresAuth) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        let refreshedToken: string | null = null;

        try {
          // 1. Try secure cookie-based refresh
          const cookieRefreshRes = await fetch(`${this.baseUrl}auth/cookie/refresh/`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });

          if (cookieRefreshRes.ok) {
            refreshedToken = 'cookie-refreshed';
          } else {
            // 2. Fallback to localStorage refresh token
            const refreshToken = await this.getRefreshToken();
            if (refreshToken) {
              const refreshRes = await fetch(`${this.baseUrl}auth/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
              });

              if (refreshRes.ok) {
                const refreshData = await refreshRes.json();
                const newAccess = refreshData.access || refreshData.token;
                if (newAccess) {
                  await this.setAccessToken(newAccess);
                  if (refreshData.refresh) {
                    await this.setRefreshToken(refreshData.refresh);
                  }
                  refreshedToken = newAccess;
                }
              }
            }
          }
        } catch {
          // Refresh failed
        }

        this.isRefreshing = false;

        if (refreshedToken) {
          this.onRefreshed(refreshedToken);
          if (this.onTokenRefreshed) {
            this.onTokenRefreshed(refreshedToken);
          }
          if (refreshedToken !== 'cookie-refreshed') {
            headers['Authorization'] = `Bearer ${refreshedToken}`;
          }
          return this.request<T>(endpoint, { ...options, headers });
        } else {
          if (this.onUnauthorized) {
            await this.clearTokens();
            this.onUnauthorized();
          }
        }
      } else {
        // Wait for active refresh to finish
        return new Promise<T>((resolve, reject) => {
          this.addRefreshSubscriber(async (newToken) => {
            try {
              if (newToken !== 'cookie-refreshed') {
                headers['Authorization'] = `Bearer ${newToken}`;
              }
              const retryRes = await this.request<T>(endpoint, { ...options, headers });
              resolve(retryRes);
            } catch (retryErr) {
              reject(retryErr);
            }
          });
        });
      }
    }

    let responseData: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      responseData = text ? JSON.parse(text) : {};
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        responseData?.error ||
        responseData?.message ||
        responseData?.detail ||
        `HTTP ${response.status}`;

      if (this.onError) {
        this.onError(endpoint, method, response.status, errorMessage, { url, data: responseData });
      }

      const error: ApiError = {
        message: errorMessage,
        status: response.status,
        data: responseData,
      };
      throw error;
    }

    return responseData as T;
  }

  // First-class HTTP verb shortcuts
  public async get<T = unknown>(
    endpoint: string,
    options?: RequestInit & { requiresAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public async post<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit & { requiresAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  public async put<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit & { requiresAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  public async patch<T = unknown>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit & { requiresAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  public async delete<T = unknown>(
    endpoint: string,
    options?: RequestInit & { requiresAuth?: boolean }
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  public async getBlob(
    endpoint: string,
    options?: RequestInit & { requiresAuth?: boolean }
  ): Promise<Blob> {
    const requiresAuth = options?.requiresAuth ?? true;
    const url = this.buildUrl(endpoint);
    const headers: Record<string, string> = {
      'X-Partner-Code': this.tenantId || 'tracklr',
      'X-Tenant-ID': this.tenantId || 'tracklr',
      ...((options?.headers as Record<string, string>) || {}),
    };
    if (this.businessSlug) headers['X-Business-Slug'] = this.businessSlug;
    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
      headers['X-Developer-API-Key'] = this.apiKey;
    }
    if (requiresAuth) {
      const token = await this.getAccessToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, { ...options, method: 'GET', headers, credentials: 'include' });
    if (!response.ok) {
      throw new Error(`Failed to download: HTTP ${response.status}`);
    }
    return await response.blob();
  }
}

