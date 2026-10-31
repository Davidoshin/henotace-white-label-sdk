import { HttpClient } from './client.js';
import { ProductionBatch, ProductionRecipe, RawMaterial, WasteRecord } from './types.js';

export class ProductionModule {
  constructor(private http: HttpClient) {}

  private buildQuery(params: Record<string, unknown> = {}): string {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return qs ? `?${qs}` : '';
  }

  // --- Batches & Runs ---
  public async getBatches(params: Record<string, unknown> = {}): Promise<any> {
    const endpoint = `business/production/batches/${this.buildQuery(params)}`;
    return await this.http.get<any>(endpoint).catch(() =>
      this.http.get<any>(`production/batches/${this.buildQuery(params)}`)
    );
  }

  public async createBatch(batch: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/batches/', batch).catch(() =>
      this.http.post<any>('production/batches/', batch)
    );
  }

  public async updateBatchStatus(
    batchId: number | string,
    status: ProductionBatch['status'] | string,
    details: Record<string, unknown> = {}
  ): Promise<any> {
    return await this.http.patch<any>(`business/production/batches/${batchId}/status/`, { status, ...details }).catch(() =>
      this.http.patch<any>(`production/batches/${batchId}/status/`, { status, ...details })
    );
  }

  public async deleteBatch(batchId: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/batches/${batchId}/`).catch(() =>
      this.http.delete<any>(`production/batches/${batchId}/`)
    );
  }

  public async generateBatchCode(): Promise<{ code: string } | any> {
    return await this.http.get<any>('business/production/batches/generate-code/');
  }

  // --- Recipes & Formulations ---
  public async getRecipes(): Promise<any> {
    return await this.http.get<any>('business/production/recipes/').catch(() =>
      this.http.get<any>('production/recipes/')
    );
  }

  public async createRecipe(recipe: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/recipes/', recipe).catch(() =>
      this.http.post<any>('production/recipes/', recipe)
    );
  }

  public async updateRecipe(recipeId: number | string, recipe: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/recipes/${recipeId}/`, recipe).catch(() =>
      this.http.put<any>(`production/recipes/${recipeId}/`, recipe)
    );
  }

  public async deleteRecipe(recipeId: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/recipes/${recipeId}/`).catch(() =>
      this.http.delete<any>(`production/recipes/${recipeId}/`)
    );
  }

  // --- Warehouse & Raw Materials ---
  public async getWarehouseStock(): Promise<any> {
    return await this.http.get<any>('business/production/warehouse/');
  }

  public async createWarehouseItem(item: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/warehouse/', item);
  }

  public async updateWarehouseItem(id: number | string, item: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/warehouse/${id}/`, item);
  }

  public async deleteWarehouseItem(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/warehouse/${id}/`);
  }

  public async getFinishedGoods(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/production/finished-goods/${this.buildQuery(params)}`);
  }

  public async getRawMaterials(): Promise<any> {
    return await this.http.get<any>('business/production/raw-materials/').catch(() =>
      this.http.get<any>('production/raw-materials/')
    );
  }

  public async getInventorySummary(branchId?: number | string): Promise<any> {
    const query = branchId && branchId !== 'all' ? `?branch_id=${branchId}` : '';
    return await this.http.get<any>(`business/production/inventory-summary/${query}`);
  }

  public async adjustStock(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/stock-adjustment/', data);
  }

  public async bulkImport(mode: string, formData: FormData): Promise<any> {
    return await this.http.post<any>(`business/production/${mode}/bulk-import/`, formData);
  }

  public async recordWaste(waste: Partial<WasteRecord> | Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/waste/', waste).catch(() =>
      this.http.post<any>('production/waste/', waste)
    );
  }

  public async getCatalogItems(mode: string): Promise<any> {
    const endpoint = mode === 'raw-materials' 
      ? 'business/production/raw-materials/'
      : mode === 'finished-goods'
      ? 'business/production/finished-goods/'
      : 'business/production/vendors/';
    return await this.http.get<any>(endpoint);
  }

  public async createCatalogItem(mode: string, data: any): Promise<any> {
    const endpoint = mode === 'raw-materials' 
      ? 'business/production/raw-materials/'
      : mode === 'finished-goods'
      ? 'business/production/finished-goods/'
      : 'business/production/vendors/';
    return await this.http.post<any>(endpoint, data);
  }

  public async updateCatalogItem(mode: string, id: number | string, data: any): Promise<any> {
    const endpoint = mode === 'raw-materials' 
      ? `business/production/raw-materials/${id}/`
      : mode === 'finished-goods'
      ? `business/production/finished-goods/${id}/`
      : `business/production/vendors/${id}/`;
    return await this.http.put<any>(endpoint, data);
  }

  public async deleteCatalogItem(mode: string, id: number | string): Promise<any> {
    const endpoint = mode === 'raw-materials' 
      ? `business/production/raw-materials/${id}/`
      : mode === 'finished-goods'
      ? `business/production/finished-goods/${id}/`
      : `business/production/vendors/${id}/`;
    return await this.http.delete<any>(endpoint);
  }

  // --- Categories ---
  public async getCategories(): Promise<any> {
    return await this.http.get<any>('business/production/categories/');
  }

  public async createCategory(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/categories/', data);
  }

  public async updateCategory(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/categories/${id}/`, data);
  }

  public async deleteCategory(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/categories/${id}/`);
  }

  // --- Equipment & Maintenance ---
  public async getEquipment(): Promise<any> {
    return await this.http.get<any>('business/production/equipment/');
  }

  public async createEquipment(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/equipment/', data);
  }

  public async updateEquipment(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/equipment/${id}/`, data);
  }

  public async getEquipmentMaintenance(equipmentId: number | string): Promise<any> {
    return await this.http.get<any>(`business/production/equipment/${equipmentId}/maintenance/`);
  }

  public async recordEquipmentMaintenance(equipmentId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/production/equipment/${equipmentId}/maintenance/`, data);
  }

  // --- Operations & Costs ---
  public async getCosts(params?: Record<string, unknown> | string): Promise<any> {
    let qs = '';
    if (typeof params === 'string') {
      qs = params ? `?${params}` : '';
    } else if (params) {
      qs = this.buildQuery(params);
    }
    return await this.http.get<any>(`business/production/costs/${qs}`);
  }

  public async createCost(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/costs/', data);
  }

  public async updateCost(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/costs/${id}/`, data);
  }

  public async deleteCost(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/costs/${id}/`);
  }

  // --- Suppliers & Purchase Orders ---
  public async getSuppliers(): Promise<any> {
    return await this.http.get<any>('business/production/suppliers/');
  }

  public async createSupplier(data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.post<any>('business/production/suppliers/', data);
  }

  public async updateSupplier(id: number | string, data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.put<any>(`business/production/suppliers/${id}/`, data);
  }

  public async deleteSupplier(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/suppliers/${id}/`);
  }

  public async getPurchaseOrders(): Promise<any> {
    return await this.http.get<any>('business/production/purchase-orders/');
  }

  public async createPurchaseOrder(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/purchase-orders/', data);
  }

  public async updatePurchaseOrder(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/purchase-orders/${id}/`, data);
  }

  public async receivePurchaseOrder(poId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/production/purchase-orders/${poId}/receive/`, data);
  }

  public async payPurchaseOrder(poId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/production/purchase-orders/${poId}/pay/`, data);
  }

  public async paySupplier(supplierId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/production/suppliers/${supplierId}/payment/`, data);
  }

  public async recordSupplierReturn(supplierId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/production/suppliers/${supplierId}/record-return/`, data);
  }

  public async getPriceHistory(supplierId?: number | string): Promise<any> {
    const endpoint = supplierId 
      ? `business/production/suppliers/${supplierId}/price-history/` 
      : `business/production/price-history/`;
    return await this.http.get<any>(endpoint);
  }

  // --- External Vendors & Activities ---
  public async getVendors(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/production/vendors/${this.buildQuery(params)}`);
  }

  public async createVendor(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/vendors/', data);
  }

  public async updateVendor(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/vendors/${id}/`, data);
  }

  public async deleteVendor(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/vendors/${id}/`);
  }

  public async getVendorActivities(vendorId: number | string, params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/production/vendors/${vendorId}/activities/${this.buildQuery(params)}`);
  }

  public async createVendorActivity(vendorId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/production/vendors/${vendorId}/activities/`, data);
  }

  public async updateVendorActivity(activityId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/vendor-activities/${activityId}/`, data);
  }

  public async deleteVendorActivity(activityId: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/vendor-activities/${activityId}/`);
  }

  // --- Vendor Portal ---
  public async getVendorPortalSummary(): Promise<any> {
    return await this.http.get<any>('business/production/vendor-portal/summary/');
  }

  public async getVendorPortalFinishedGoods(): Promise<any> {
    return await this.http.get<any>('business/production/vendor-portal/finished-goods/');
  }

  public async createVendorPortalActivity(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/vendor-portal/activities/', data);
  }

  public async payVendorPortal(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/vendor-portal/pay/', data);
  }

  // --- Staff & Labor ---
  public async getStaff(): Promise<any> {
    return await this.http.get<any>('business/production/staff/');
  }

  public async createStaff(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/staff/', data);
  }

  public async updateStaff(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/production/staff/${id}/`, data);
  }

  public async deleteStaff(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/production/staff/${id}/`);
  }

  // --- Accounts & Financials ---
  public async getAccountsSummary(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/production/accounts/summary/${this.buildQuery(params)}`);
  }

  public async createIncomeStatement(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/accounts/income-statements/', data);
  }

  public async createCashFlow(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/accounts/cash-flows/', data);
  }

  public async createBalanceSheet(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/accounts/balance-sheets/', data);
  }

  public async getDashboard(branchId?: number | string): Promise<any> {
    const query = branchId && branchId !== 'all' ? `?branch_id=${branchId}` : '';
    return await this.http.get<any>(`business/production-dashboard/${query}`);
  }
}
