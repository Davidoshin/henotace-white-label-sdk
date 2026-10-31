import { HttpClient } from './client.js';

export interface Supplier {
  id: number | string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  contact_person?: string;
  [key: string]: unknown;
}

export class SuppliersModule {
  constructor(private http: HttpClient) {}

  public async list(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/suppliers/${qs ? `?${qs}` : ''}`);
  }

  public async getById(id: number | string): Promise<Supplier> {
    return await this.http.get<Supplier>(`business/suppliers/${id}/`);
  }

  public async create(data: Partial<Supplier>): Promise<Supplier> {
    return await this.http.post<Supplier>('business/suppliers/', data);
  }

  public async update(id: number | string, data: Partial<Supplier>): Promise<Supplier> {
    return await this.http.put<Supplier>(`business/suppliers/${id}/`, data);
  }

  public async delete(id: number | string): Promise<void> {
    await this.http.delete(`business/suppliers/${id}/`);
  }

  public async getPayments(): Promise<any> {
    return await this.http.get<any>('business/suppliers/payments/');
  }

  public async recordSupply(supplierId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/suppliers/${supplierId}/record-supply/`, data);
  }

  public async makePayment(supplierId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/suppliers/${supplierId}/payment/`, data);
  }

  public async getSupplyHistory(supplierId: number | string): Promise<any> {
    return await this.http.get<any>(`business/suppliers/${supplierId}/supply-history/`);
  }

  public async updateSupply(supplierId: number | string, supplyId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/suppliers/${supplierId}/supplies/${supplyId}/`, data);
  }

  public async deleteSupply(supplierId: number | string, supplyId: number | string): Promise<any> {
    return await this.http.delete(`business/suppliers/${supplierId}/supplies/${supplyId}/`);
  }

  public async getPriceHistory(supplierId?: number | string): Promise<any> {
    const endpoint = supplierId
      ? `business/suppliers/${supplierId}/price-history/`
      : 'business/suppliers/price-history/';
    return await this.http.get<any>(endpoint);
  }

  public async getVouchers(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/suppliers/${id}/vouchers/`);
  }
}
