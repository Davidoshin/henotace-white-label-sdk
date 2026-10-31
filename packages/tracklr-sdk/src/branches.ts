import { HttpClient } from './client.js';

export interface Branch {
  id: number | string;
  name: string;
  is_main?: boolean;
  address?: string;
  phone?: string;
  [key: string]: unknown;
}

export class BranchesModule {
  constructor(private http: HttpClient) {}

  public async list(): Promise<Branch[]> {
    const res = await this.http.get<any>('business/branches/');
    if (Array.isArray(res)) return res;
    return res?.results || res?.branches || [];
  }

  public async getOverview(): Promise<any> {
    return await this.http.get<any>('business/branches/');
  }

  public async listBranchesAndStores(): Promise<any> {
    return await this.http.get<any>('business/branches-stores/').catch(() => this.list());
  }

  public async getPermissions(): Promise<any> {
    return await this.http.get<any>('business/branches/permissions/');
  }

  public async getNotifications(branchId?: number | string): Promise<any> {
    const query = branchId ? `?branch_id=${branchId}` : '';
    return await this.http.get<any>(`business/notifications/${query}`);
  }

  public async markNotificationRead(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/notifications/${id}/read/`, {});
  }

  public async markAllNotificationsRead(branchId?: number | string): Promise<any> {
    return await this.http.post<any>('business/notifications/read-all/', { branch_id: branchId });
  }

  public async performNotificationAction(id: number | string, action: string, data: Record<string, unknown> = {}): Promise<any> {
    return await this.http.post<any>(`business/notifications/${id}/action/`, { action, ...data });
  }

  public async getGoals(): Promise<any> {
    return await this.http.get<any>('business/goals/');
  }

  public async getTaxRemittances(status: string = 'pending'): Promise<any> {
    return await this.http.get<any>(`business/tax-remittances/?status=${encodeURIComponent(status)}`);
  }

  public async create(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/branches/', data);
  }

  public async update(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/branches/${id}/`, data);
  }

  public async delete(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/branches/${id}/`);
  }

  public async createDefault(): Promise<any> {
    return await this.http.post<any>('business/branches/create-default/', {});
  }

  public async assignStaff(branchId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/branches/${branchId}/assign-staff/`, data);
  }
}

