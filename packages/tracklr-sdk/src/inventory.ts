import { HttpClient } from './client.js';

export class InventoryModule {
  constructor(private http: HttpClient) {}

  public async getStockHistory(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/stock-history/${qs ? `?${qs}` : ''}`);
  }

  public async getProductStockHistory(productId: number | string, params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/stock-history/${productId}/${qs ? `?${qs}` : ''}`);
  }

  public async getSummary(params?: Record<string, unknown> | number | string): Promise<any> {
    if (typeof params === 'object' && params !== null) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          query.append(k, String(v));
        }
      });
      const qs = query.toString();
      return await this.http.get<any>(`business/inventory/summary/${qs ? `?${qs}` : ''}`);
    }
    const query = params ? `?branch_id=${params}` : '';
    return await this.http.get<any>(`business/inventory/summary/${query}`);
  }

  public async getSpoilageRecords(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/retail-spoilage/${qs ? `?${qs}` : ''}`);
  }

  public async recordSpoilage(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/retail-spoilage/', data);
  }

  public async deleteSpoilage(id: number | string, options: { restore_stock?: boolean } = {}): Promise<void> {
    const qs = options.restore_stock !== undefined ? `?restore_stock=${options.restore_stock}` : '';
    await this.http.delete(`business/retail-spoilage/${id}/${qs}`);
  }

  public async getWasteRecords(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/production-waste/${qs ? `?${qs}` : ''}`).catch(() =>
      this.http.get<any>(`business/waste-records/${qs ? `?${qs}` : ''}`)
    );
  }

  public async recordWaste(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production-waste/', data).catch(() =>
      this.http.post<any>('business/waste-records/', data)
    );
  }

  public async deleteWaste(id: number | string): Promise<void> {
    await this.http.delete(`business/production-waste/${id}/`).catch(() =>
      this.http.delete(`business/waste-records/${id}/`)
    );
  }

  public async getReturns(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/returns/${qs ? `?${qs}` : ''}`);
  }

  public async createReturn(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/returns/', data);
  }

  // Stores
  public async getStores(): Promise<any> {
    return await this.http.get<any>('business/stores/');
  }

  public async getStoreById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/stores/${id}/`);
  }

  public async createStore(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/stores/', data);
  }

  public async updateStore(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/stores/${id}/`, data);
  }

  public async deleteStore(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/stores/${id}/`);
  }

  public async getStoreTransfers(): Promise<any> {
    return await this.http.get<any>('business/store-transfers/');
  }

  public async addStoreStock(storeId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/stores/${storeId}/add-stock/`, data);
  }

  public async bulkAddStoreStock(storeId: number | string, data: FormData | Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/stores/${storeId}/bulk-add-stock/`, data);
  }

  public async createStoreTransfer(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/store-transfers/', data);
  }

  public async updateStoreStock(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/store-stock/${id}/`, data);
  }

  public async deleteStoreStock(id: number | string): Promise<any> {
    return await this.http.delete(`business/store-stock/${id}/`);
  }

  // Branch Stock
  public async getBranchStock(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/branch-stock/${qs ? `?${qs}` : ''}`);
  }

  public async updateBranchStock(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/branch-stock/${id}/`, data);
  }

  public async deleteBranchStock(id: number | string): Promise<any> {
    return await this.http.delete(`business/branch-stock/${id}/`);
  }

  public async transferBranchStock(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/branch-stock/transfer/', data);
  }

  public async getBranchTransferHistory(): Promise<any> {
    return await this.http.get<any>('business/branch-stock/transfer-history/');
  }

  public async updateBranchStockLevels(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/branch-stock/update/', data);
  }

  // Categories
  public async getCategories(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/categories/${qs ? `?${qs}` : ''}`);
  }

  public async createCategory(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/categories/', data);
  }

  public async updateCategory(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/categories/${id}/`, data);
  }

  public async deleteCategory(id: number | string, branchId?: number | string): Promise<any> {
    const query = branchId && branchId !== 'all' ? `?branch_id=${branchId}` : '';
    return await this.http.delete(`business/categories/${id}/${query}`);
  }

  // Expiring Products & SKU
  public async getExpiringProducts(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/products/expiring/${qs ? `?${qs}` : ''}`);
  }

  public async generateSku(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/generate-sku/', data);
  }
}
