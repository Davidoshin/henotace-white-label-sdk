import { HttpClient } from './client.js';

export interface CustomerActivityResponse {
  success: boolean;
  customer: {
    id: number;
    name: string;
  };
  filters: {
    start_date: string;
    end_date: string;
    selected_category: string;
    categories: Array<{ value: string; label: string }>;
  };
  summary: {
    total_activities: number;
    purchase_total: number;
    wallet_count: number;
    credit_count: number;
    credit_payment_count?: number;
    credit_payment_total?: number;
    order_count: number;
  };
  activities: Array<{
    id: string;
    category: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    amount?: number;
    meta?: Record<string, unknown>;
  }>;
}

export class CustomerModule {
  constructor(private http: HttpClient) {}

  public async getActivity(
    customerId: number | string,
    params: Record<string, unknown> = {}
  ): Promise<CustomerActivityResponse> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    const endpoint = `business/customers/${customerId}/activity/${queryString ? `?${queryString}` : ''}`;
    return await this.http.get<CustomerActivityResponse>(endpoint);
  }

  public async list(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`business/customers/${queryString ? `?${queryString}` : ''}`);
  }

  public async getById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/customers/${id}/`);
  }

  public async create(data: unknown): Promise<any> {
    return await this.http.post<any>('business/customers/', data);
  }

  public async update(id: number | string, data: unknown): Promise<any> {
    return await this.http.put<any>(`business/customers/${id}/`, data);
  }

  public async delete(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/customers/${id}/`);
  }

  public async topupWallet(customerId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/customers/${customerId}/wallet/topup/`, data);
  }

  public async debitWallet(customerId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/customers/${customerId}/wallet/debit/`, data);
  }

  public async getSignupLink(): Promise<any> {
    return await this.http.get<any>('business/customers/signup-link/');
  }

  public async getCurrentProfile(): Promise<any> {
    return await this.http.get<any>('business/customer/profile/');
  }

  public async getReports(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/reports/customers/${qs ? `?${qs}` : ''}`);
  }

  public async adjustLoyaltyPoints(customerId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/customers/${customerId}/adjust-points/`, data);
  }

  public async getLoyaltyConfig(): Promise<any> {
    return await this.http.get<any>('business/loyalty/config/');
  }

  public async updateLoyaltyConfig(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/loyalty/config/', data);
  }
}
