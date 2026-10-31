import { HttpClient } from './client.js';
import { Business } from './types.js';

export class TenancyModule {
  constructor(private http: HttpClient) {}

  public async getCurrentBusiness(): Promise<Business> {
    return await this.http.request<Business>('businesses/current/');
  }

  public async listUserBusinesses(): Promise<Business[]> {
    const res = await this.http.request<Business[] | { results: Business[] }>('businesses/my-businesses/');
    if (Array.isArray(res)) {
      return res;
    }
    return res.results || [];
  }

  public async switchBusiness(businessId: number | string): Promise<{ success: boolean; business: Business; token?: string }> {
    const res = await this.http.request<{ success: boolean; business: Business; token?: string }>(`businesses/${businessId}/switch/`, {
      method: 'POST',
    });
    if (res.token) {
      await this.http.setAccessToken(res.token);
    }
    this.http.setTenantId(String(businessId));
    return res;
  }

  public async checkLimits(resource: string): Promise<any> {
    return await this.http.get<any>(`business/subscription/check-limits/?resource=${encodeURIComponent(resource)}`);
  }

  public async getSettings(): Promise<any> {
    return await this.http.get<any>('business/update/');
  }

  public async updateSettings(data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>('business/update/', data);
  }

  public async getMyManager(): Promise<any> {
    return await this.http.get<any>('business/my-manager/');
  }

  public async getComplaints(): Promise<any> {
    return await this.http.get<any>('business/complaints/');
  }

  public async sendComplaint(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/complaints/send/', data);
  }

  public async uploadImage(formData: FormData): Promise<any> {
    return await this.http.post<any>('business/image-upload/', formData);
  }

  public async uploadSignature(formData: FormData): Promise<any> {
    return await this.http.post<any>('business/upload-signature/', formData);
  }

  public async getAiManagerCredits(): Promise<any> {
    return await this.http.get<any>('business/ai-manager/credits/');
  }

  public async getProfile(): Promise<any> {
    return await this.http.get<any>('profile/');
  }

  public async getBusinessInfo(): Promise<any> {
    return await this.http.get<any>('business/info/');
  }

  public async getDashboard(branchId?: number | string): Promise<any> {
    const query = branchId && branchId !== 'all' ? `?branch_id=${branchId}` : '';
    return await this.http.get<any>(`business/dashboard/${query}`);
  }

  public async getBusiness(): Promise<any> {
    return await this.http.get<any>('business/');
  }

  public async updateProfile(data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>('profile/', data);
  }

  public async uploadProfileImage(formData: FormData): Promise<any> {
    return await this.http.post<any>('profile/image/', formData);
  }

  public async getAiCreditsBalance(): Promise<any> {
    return await this.http.get<any>('ai-credits/balance/');
  }

  public async initiateAiCreditsPurchase(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('ai-credits/purchase/initiate/', data);
  }

  public async getNotifications(params: Record<string, unknown> = {}): Promise<any> {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') q.append(k, String(v));
    });
    const qs = q.toString();
    return await this.http.get<any>(`business/notifications/${qs ? `?${qs}` : ''}`);
  }

  public async markNotificationRead(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/notifications/${id}/read/`, {});
  }

  public async markAllNotificationsRead(): Promise<any> {
    return await this.http.post<any>('business/notifications/mark-all-read/', {});
  }
}

