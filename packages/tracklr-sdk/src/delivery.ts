import { HttpClient } from './client.js';

export class DeliveryModule {
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

  // Delivery Orders
  public async getOrders(params: Record<string, unknown> = {}, options?: { isProduction?: boolean }): Promise<any> {
    const qs = this.buildQuery(params);
    if (options?.isProduction) {
      return await this.http.get<any>(`business/production-delivery/orders/${qs}`);
    }
    return await this.http.get<any>(`business/delivery/orders/${qs}`).catch(() =>
      this.http.get<any>(`business/delivery-orders/${qs}`)
    );
  }

  public async getOrderById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/delivery/orders/${id}/`).catch(() =>
      this.http.get<any>(`business/delivery-orders/${id}/`)
    );
  }

  public async updateOrder(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/delivery/orders/${id}/`, data).catch(() =>
      this.http.put<any>(`business/delivery-orders/${id}/`, data)
    );
  }

  public async assignRider(deliveryId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/delivery/orders/${deliveryId}/assign-rider/`, data);
  }

  public async updateOrderStatus(deliveryId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/delivery/orders/${deliveryId}/status/`, data);
  }

  // Tracking & Customer Delivery
  public async getTracking(code: string): Promise<any> {
    return await this.http.get<any>(`delivery/track/${encodeURIComponent(code)}/`).catch(() =>
      this.http.get<any>(`business/delivery-tracking/${encodeURIComponent(code)}/`)
    );
  }

  public async getCustomerDeliveries(): Promise<any> {
    return await this.http.get<any>('delivery/my-orders/');
  }

  public async getCustomerDeliveryStatus(deliveryId: number | string): Promise<any> {
    return await this.http.get<any>(`delivery/${deliveryId}/status/`);
  }

  public async confirmCustomerDelivery(deliveryId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`delivery/${deliveryId}/confirm/`, data);
  }

  // Order Prep Tracking
  public async getActivePrepOrders(): Promise<any> {
    return await this.http.get<any>('business/orders/active-prep/').catch(() =>
      this.http.get<any>('business/order-prep-tracking/')
    );
  }

  public async getOrderPrepTracking(): Promise<any> {
    return await this.getActivePrepOrders();
  }

  public async updatePrepStatus(orderId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/orders/${orderId}/update-prep-status/`, data);
  }

  public async extendPrepTime(orderId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/orders/${orderId}/extend-prep-time/`, data);
  }

  // Shipments
  public async getShipments(params: Record<string, unknown> = {}): Promise<any> {
    const qs = this.buildQuery(params);
    return await this.http.get<any>(`business/shipments/${qs}`).catch(() =>
      this.http.get<any>(`business/shipping-management/${qs}`)
    );
  }

  public async createShipment(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/shipments/', data);
  }

  public async getShipmentById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/shipments/${id}/`).catch(() =>
      this.http.get<any>(`business/shipping-management/${id}/`)
    );
  }

  public async updateShipment(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/shipments/${id}/`, data).catch(() =>
      this.http.put<any>(`business/shipping-management/${id}/`, data)
    );
  }
}
