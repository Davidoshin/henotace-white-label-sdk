import { HttpClient } from './client.js';

export interface DepartmentDashboardData {
  department: string;
  [key: string]: unknown;
}

export class DepartmentsModule {
  constructor(private http: HttpClient) {}

  public async getDashboard(department: string = 'sales'): Promise<DepartmentDashboardData> {
    return await this.http.get<DepartmentDashboardData>(
      `business/departments/dashboard/?department=${encodeURIComponent(department)}`
    );
  }

  public async list(): Promise<string[]> {
    const res = await this.http.get<{ departments: string[] }>('business/departments/');
    return res.departments || [];
  }

  public async getZReport(): Promise<any> {
    return await this.http.get<any>('business/departments/z-report/');
  }
}
