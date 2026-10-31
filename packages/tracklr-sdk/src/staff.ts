import { HttpClient } from './client.js';

export interface StaffMember {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
  branch?: number | string;
  [key: string]: unknown;
}

export interface AbsenceRequest {
  id: number | string;
  staff?: number | string;
  staff_name?: string;
  reason?: string;
  start_date?: string;
  end_date?: string;
  status?: 'pending' | 'approved' | 'rejected';
  [key: string]: unknown;
}

export class StaffBrmSubmodule {
  constructor(private http: HttpClient) {}

  public async getDashboard(): Promise<any> {
    return await this.http.get<any>('brm/dashboard/');
  }

  public async getIssueNotes(resolvedParam: string = ''): Promise<any> {
    return await this.http.get<any>(`brm/issue-notes/${resolvedParam}`);
  }

  public async resolveNote(noteId: number | string, data: unknown): Promise<any> {
    return await this.http.post<any>(`brm/notes/${noteId}/resolve/`, data);
  }

  public async reopenNote(noteId: number | string, data: unknown): Promise<any> {
    return await this.http.post<any>(`brm/notes/${noteId}/reopen/`, data);
  }

  public async getBusiness(businessId: number | string): Promise<any> {
    return await this.http.get<any>(`brm/business/${businessId}/`);
  }

  public async createBusinessNote(businessId: number | string, data: unknown): Promise<any> {
    return await this.http.post<any>(`brm/business/${businessId}/note/`, data);
  }
}

export class StaffModule {
  public brm: StaffBrmSubmodule;

  constructor(private http: HttpClient) {
    this.brm = new StaffBrmSubmodule(this.http);
  }

  public async getCurrentStaff(options?: { isProduction?: boolean }): Promise<any> {
    const endpoint = options?.isProduction ? 'business/production/staff/me/' : 'business/staff/me/';
    return await this.http.get<any>(endpoint);
  }

  public async list(params: Record<string, unknown> = {}, options?: { isProduction?: boolean }): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    const base = options?.isProduction ? 'business/production/staff/' : 'business/staff/';
    return await this.http.get<any>(`${base}${qs ? `?${qs}` : ''}`);
  }

  public async getById(id: number | string, options?: { isProduction?: boolean }): Promise<any> {
    const base = options?.isProduction ? 'business/production/staff/' : 'business/staff/';
    return await this.http.get<any>(`${base}${id}/`);
  }

  public async create(data: unknown, options?: { isProduction?: boolean }): Promise<any> {
    const base = options?.isProduction ? 'business/production/staff/' : 'business/staff/';
    return await this.http.post<any>(base, data);
  }

  public async update(id: number | string, data: unknown, options?: { isProduction?: boolean }): Promise<any> {
    const base = options?.isProduction ? 'business/production/staff/' : 'business/staff/';
    return await this.http.put<any>(`${base}${id}/`, data);
  }

  public async delete(id: number | string, options?: { isProduction?: boolean }): Promise<void> {
    const base = options?.isProduction ? 'business/production/staff/' : 'business/staff/';
    await this.http.delete(`${base}${id}/`);
  }

  public async getActivity(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/staff-activity/${qs ? `?${qs}` : ''}`);
  }

  public async recordActivity(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/staff/activity/', data);
  }

  public async getAttendance(staffId: number | string, month: number, year: number): Promise<any> {
    return await this.http.get<any>(`business/staff/${staffId}/attendance/?month=${month}&year=${year}`);
  }

  public async getMyAbsenceRequests(): Promise<any> {
    return await this.http.get<any>('business/staff/absence/my-requests/');
  }

  public async requestAbsence(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/staff/absence/request/', data);
  }

  public async getSalary(month: number, year: number): Promise<any> {
    return await this.http.get<any>(`business/staff/salary/?month=${month}&year=${year}`);
  }

  public async clockInOut(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/staff/clock/', data);
  }

  public async clockIn(): Promise<any> {
    return await this.http.post<any>('business/attendance/clock-in/', {});
  }

  public async clockOut(): Promise<any> {
    return await this.http.post<any>('business/attendance/clock-out/', {});
  }

  public async getStaffActivity(staffId: number | string, params: Record<string, unknown> = {}, options?: { isProduction?: boolean }): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    const base = options?.isProduction ? 'business/production/staff' : 'business/staff';
    return await this.http.get<any>(`${base}/${staffId}/activity/${qs ? `?${qs}` : ''}`);
  }

  public async getMyTax(): Promise<any> {
    return await this.http.get<any>('business/staff/my-tax/');
  }

  public async updateMyTaxAccommodation(data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>('business/staff/my-tax/accommodation/', data);
  }

  public async getAbsenceRequests(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/absence-requests/${qs ? `?${qs}` : ''}`);
  }

  public async submitAbsenceRequest(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/absence-requests/', data);
  }

  public async updateAbsenceRequestStatus(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/absence-requests/${id}/`, data);
  }

  public async reviewAbsenceRequest(id: number | string, action: 'approve' | 'reject', payload?: string | Record<string, unknown>): Promise<any> {
    const body = typeof payload === 'string' ? { notes: payload } : (payload || {});
    return await this.http.post<any>(`business/absence-requests/${id}/${action}/`, body);
  }

  public async getAttendanceSettings(): Promise<any> {
    return await this.http.get<any>('business/hr/attendance-settings/');
  }

  public async updateAttendanceSettings(settings: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/hr/attendance-settings/', settings);
  }

  public async getAttendanceRecords(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/hr/attendance/${qs ? `?${qs}` : ''}`);
  }

  public async getPayrollOverview(): Promise<any> {
    return await this.http.get<any>('business/payroll/overview/');
  }

  public async getSalaryStructures(): Promise<any> {
    return await this.http.get<any>('business/payroll/salary-structures/');
  }

  public async createSalaryStructure(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/payroll/salary-structures/', data);
  }

  public async updateSalaryStructure(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/payroll/salary-structures/${id}/`, data);
  }

  public async deleteSalaryStructure(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/payroll/salary-structures/${id}/delete/`, {});
  }

  public async generatePayroll(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/payroll/generate/', data);
  }

  public async payPayroll(payrollIds: (string | number)[]): Promise<any> {
    return await this.http.post<any>('business/payroll/pay/', { payroll_ids: payrollIds });
  }

  public async getPayrollData(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/hr-payroll/${qs ? `?${qs}` : ''}`);
  }

  public async updatePayroll(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/hr-payroll/${id}/`, data);
  }

  public async getReports(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/reports/staff/${qs ? `?${qs}` : ''}`).catch(() =>
      this.http.get<any>(`business/staff-reports/${qs ? `?${qs}` : ''}`)
    );
  }
}
