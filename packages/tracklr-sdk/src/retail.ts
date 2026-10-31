import { HttpClient } from './client.js';
import { RetailProduct, CreateSalePayload, ZReportResponse } from './types.js';

export class RetailModule {
  constructor(private http: HttpClient) {}

  public async getProducts(params: Record<string, unknown> = {}, options?: RequestInit): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    const endpoint = `business/products/${queryString ? `?${queryString}` : ''}`;
    return await this.http.get<any>(endpoint, options).catch(() =>
      this.http.get<any>(`products/${queryString ? `?${queryString}` : ''}`, options)
    );
  }

  public async getProductById(id: number | string, params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/products/${id}/${qs ? `?${qs}` : ''}`).catch(() =>
      this.http.get<any>(`products/${id}/${qs ? `?${qs}` : ''}`)
    );
  }

  public async createProduct(product: unknown): Promise<any> {
    return await this.http.post<any>('business/products/', product).catch(() =>
      this.http.post<any>('products/', product)
    );
  }

  public async updateProduct(id: number | string, updates: unknown): Promise<any> {
    return await this.http.put<any>(`business/products/${id}/`, updates).catch(() =>
      this.http.patch<any>(`products/${id}/`, updates)
    );
  }

  public async deleteProduct(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/products/${id}/`).catch(() =>
      this.http.delete<any>(`products/${id}/`)
    );
  }

  public async bulkImportProducts(formData: FormData): Promise<any> {
    return await this.http.post<any>('business/products/bulk-import/', formData);
  }

  public async createSale(sale: unknown, options?: { isProduction?: boolean }): Promise<any> {
    const base = options?.isProduction ? 'business/production-sales/' : 'business/sales/';
    const alt = options?.isProduction ? 'production-sales/' : 'sales/';
    return await this.http.post<any>(base, sale).catch(() =>
      this.http.post<any>(alt, sale)
    );
  }

  public async getSales(params: Record<string, unknown> = {}, options?: { isProduction?: boolean }): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    const base = options?.isProduction ? 'business/production-sales/' : 'business/sales/';
    const endpoint = `${base}${queryString ? `?${queryString}` : ''}`;
    return await this.http.get<any>(endpoint);
  }

  public async getTodaySales(startDate?: string, pageSize: number = 200, options?: { isProduction?: boolean }): Promise<any> {
    const date = startDate || new Date().toISOString().split('T')[0];
    return await this.getSales({ start_date: date, page_size: pageSize }, options);
  }

  public async getZReport(branchId?: number | string): Promise<ZReportResponse> {
    const query = branchId ? `?branch_id=${branchId}` : '';
    return await this.http.get<ZReportResponse>(`sales/z-report/${query}`);
  }

  public async getSaleById(saleId: number | string, options?: { isProduction?: boolean }): Promise<any> {
    const base = options?.isProduction ? 'business/production-sales' : 'business/sales';
    const alt = options?.isProduction ? 'business/sales' : 'business/production-sales';
    return await this.http.get<any>(`${base}/${saleId}/`).catch(() =>
      this.http.get<any>(`${alt}/${saleId}/`)
    );
  }

  public async getDashboard(): Promise<any> {
    return await this.http.get<any>('business/dashboard/');
  }

  public async getCreditOverview(branchId?: number | string): Promise<any> {
    const query = branchId && branchId !== 'all' ? `?branch_id=${branchId}` : '';
    return await this.http.get<any>(`business/credits/overview/${query}`);
  }

  public async updateCredit(creditId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/credits/${creditId}/update/`, data);
  }

  public async recordCreditPayment(creditId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/credits/${creditId}/record-payment/`, data);
  }

  public async getCashBookAccounts(): Promise<any> {
    return await this.http.get<any>('business/cash-book/accounts/');
  }

  public async getDiscounts(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/discounts/${qs ? `?${qs}` : ''}`);
  }

  public async createDiscount(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/discounts/', data);
  }

  public async deleteDiscount(id: number | string): Promise<void> {
    await this.http.delete(`business/discounts/${id}/`);
  }

  public async getPaymentMethods(): Promise<any> {
    return await this.http.get<any>('business/payment-methods/');
  }

  public async getBusinessInfo(): Promise<any> {
    return await this.http.get<any>('business/info/');
  }

  public async getLoyaltyConfig(): Promise<any> {
    return await this.http.get<any>('business/loyalty/config/');
  }

  public async updateLoyaltyConfig(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/loyalty/config/', data);
  }

  public async fireKitchenOrder(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/kitchen/fire/', payload);
  }

  public async getKitchenTickets(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/kitchen/tickets/${qs ? `?${qs}` : ''}`);
  }

  public async updateKitchenTicketStatus(ticketId: number | string, status: string): Promise<any> {
    return await this.http.post<any>(`business/kitchen/tickets/${ticketId}/status/`, { status });
  }

  public async payKitchenTab(ticketId: number | string, payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/kitchen/tickets/${ticketId}/pay_tab/`, payload);
  }

  public async getNameSuggestions(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/products/name-suggestions/${qs ? `?${qs}` : ''}`);
  }

  public async checkSubscriptionLimits(resource: string = 'products'): Promise<any> {
    return await this.http.get<any>(`business/subscription/check-limits/?resource=${encodeURIComponent(resource)}`);
  }

  // --- Analytics & Orders ---
  public async getAnalytics(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/analytics/${qs ? `?${qs}` : ''}`);
  }

  public async getDailyAnalytics(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/analytics/daily/${qs ? `?${qs}` : ''}`);
  }

  public async getOrders(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/orders/${qs ? `?${qs}` : ''}`);
  }

  public async cancelOrder(orderId: number | string): Promise<any> {
    return await this.http.post<any>(`business/orders/${orderId}/cancel/`, {});
  }

  public async getCreditsOverview(branchId?: number | string): Promise<any> {
    return await this.http.get<any>(branchId ? `business/credits/overview/?branch_id=${branchId}` : 'business/credits/overview/');
  }

  public async getWeeklyReport(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/analytics/weekly-report/${qs ? `?${qs}` : ''}`);
  }
}

