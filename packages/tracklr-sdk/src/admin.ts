import { HttpClient } from './client.js';

export class AdminCustomerErrorsSubmodule {
  constructor(private http: HttpClient) {}

  public async list(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`admin/customer-errors/${queryString ? `?${queryString}` : ''}`);
  }

  public async stats(days: number | string = 7): Promise<any> {
    return await this.http.get<any>(`admin/customer-errors/stats/?days=${days}`);
  }

  public async getById(id: number | string): Promise<any> {
    return await this.http.get<any>(`admin/customer-errors/${id}/`);
  }

  public async updateStatus(
    id: number | string,
    data: { status?: string; resolution_notes?: string; is_suspicious?: boolean; [key: string]: any }
  ): Promise<any> {
    return await this.http.patch<any>(`admin/customer-errors/${id}/update/`, data);
  }
}

export class AdminDeliverySubmodule {
  constructor(private http: HttpClient) {}

  public async getConfig(): Promise<any> {
    return await this.http.get<any>('admin/delivery/config/');
  }

  public async updateConfig(data: unknown): Promise<any> {
    return await this.http.put<any>('admin/delivery/config/update/', data);
  }

  public async getDashboard(): Promise<any> {
    return await this.http.get<any>('admin/delivery/dashboard/');
  }

  public async getPricingTable(): Promise<any> {
    return await this.http.get<any>('admin/delivery/pricing-table/');
  }

  public async getOrders(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`admin/delivery/orders/${queryString ? `?${queryString}` : ''}`);
  }

  public async getOrderById(id: number | string): Promise<any> {
    return await this.http.get<any>(`admin/delivery/orders/${id}/`);
  }

  public async calculate(distanceKm: number): Promise<any> {
    return await this.http.post<any>('admin/delivery/calculate/', { distance_km: distanceKm });
  }

  public async updateOrderStatus(id: number | string, data: unknown): Promise<any> {
    return await this.http.post<any>(`admin/delivery/orders/${id}/status/`, data);
  }

  public async getPending(page: number = 1): Promise<any> {
    return await this.http.get<any>(`admin/delivery/pending/?page=${page}`);
  }

  public async approvePending(id: number | string): Promise<any> {
    return await this.http.post<any>(`admin/delivery/pending/${id}/approve/`, {});
  }
}

export class AdminStaffSubmodule {
  constructor(private http: HttpClient) {}

  public async list(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`admin/staff/${queryString ? `?${queryString}` : ''}`);
  }

  public async stats(): Promise<any> {
    return await this.http.get<any>('admin/staff/stats/');
  }

  public async create(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/staff/create/', data);
  }

  public async update(id: number | string, data: unknown): Promise<any> {
    return await this.http.put<any>(`admin/staff/${id}/update/`, data);
  }

  public async delete(id: number | string): Promise<any> {
    return await this.http.delete<any>(`admin/staff/${id}/delete/`);
  }

  public async getAssignments(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`admin/assignments/${queryString ? `?${queryString}` : ''}`);
  }

  public async getUnassignedBusinesses(): Promise<any> {
    return await this.http.get<any>('admin/businesses/unassigned/');
  }

  public async bulkAssign(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/assignments/bulk-assign/', data);
  }

  public async unassign(assignmentId: number | string): Promise<any> {
    return await this.http.delete<any>(`admin/assignments/${assignmentId}/unassign/`);
  }

  public async transferAssignment(assignmentId: number | string, data: unknown): Promise<any> {
    return await this.http.post<any>(`admin/assignments/${assignmentId}/transfer/`, data);
  }
}

export class AdminSecuritySubmodule {
  constructor(private http: HttpClient) {}

  public async getRoles(): Promise<any> {
    return await this.http.get<any>('security/roles/');
  }

  public async createRole(data: unknown): Promise<any> {
    return await this.http.post<any>('security/roles/create/', data);
  }

  public async getTeam(): Promise<any> {
    return await this.http.get<any>('security/team/');
  }

  public async createTeamMember(data: unknown): Promise<any> {
    return await this.http.post<any>('security/team/create/', data);
  }

  public async updateTeamMember(id: number | string, data: unknown): Promise<any> {
    return await this.http.put<any>(`security/team/${id}/update/`, data);
  }

  public async deleteTeamMember(id: number | string): Promise<any> {
    return await this.http.delete<any>(`security/team/${id}/delete/`);
  }

  public async getDashboard(): Promise<any> {
    return await this.http.get<any>('security/dashboard/');
  }

  public async getLogs(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`security/logs/${queryString ? `?${queryString}` : ''}`);
  }
}

export class AdminPlatformSubmodule {
  constructor(private http: HttpClient) {}

  public async getStats(): Promise<any> {
    try {
      return await this.http.get<any>('admin/white-label/stats/');
    } catch {
      return await this.http.get<any>('admin/business-platform/stats/');
    }
  }

  public async getBusinesses(queryOrParams: string | Record<string, unknown> = ''): Promise<any> {
    if (typeof queryOrParams === 'string') {
      const endpoint = queryOrParams
        ? `admin/business-platform/businesses/?search=${encodeURIComponent(queryOrParams)}`
        : 'admin/white-label/businesses/';
      try {
        return await this.http.get<any>(endpoint);
      } catch {
        return await this.http.get<any>('admin/business-platform/businesses/');
      }
    }

    const q = new URLSearchParams();
    Object.entries(queryOrParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        q.append(k, String(v));
      }
    });
    const qs = q.toString();
    const endpoint = `admin/white-label/businesses/${qs ? `?${qs}` : ''}`;
    try {
      return await this.http.get<any>(endpoint);
    } catch {
      return await this.http.get<any>(`admin/business-platform/businesses/${qs ? `?${qs}` : ''}`);
    }
  }

  public async getSubscriptions(params: Record<string, unknown> = {}): Promise<any> {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        q.append(k, String(v));
      }
    });
    const qs = q.toString();
    try {
      return await this.http.get<any>(`admin/white-label/subscriptions/${qs ? `?${qs}` : ''}`);
    } catch {
      return await this.http.get<any>(`admin/business-platform/subscriptions/${qs ? `?${qs}` : ''}`);
    }
  }

  public async getPayments(): Promise<any> {
    try {
      return await this.http.get<any>('admin/white-label/payments/');
    } catch {
      return await this.http.get<any>('admin/business-platform/payments/');
    }
  }

  public async getWallets(): Promise<any> {
    return await this.http.get<any>('admin/business-platform/wallets/');
  }

  public async getPendingTransfers(): Promise<any> {
    return await this.http.get<any>('admin/business-platform/pending-transfers/');
  }

  public async creditWallet(data: unknown): Promise<any> {
    try {
      return await this.http.post<any>('admin/white-label/wallets/credit/', data);
    } catch {
      return await this.http.post<any>('admin/business-platform/wallets/credit/', data);
    }
  }

  public async updateSubscription(data: unknown): Promise<any> {
    try {
      return await this.http.post<any>('admin/white-label/subscriptions/update/', data);
    } catch {
      return await this.http.post<any>('admin/business-platform/subscriptions/update/', data);
    }
  }

  public async toggleBusinessStatus(id: number | string, isActive: boolean): Promise<any> {
    try {
      return await this.http.post<any>(`admin/white-label/businesses/${id}/toggle-status/`, {
        is_active: isActive,
      });
    } catch {
      return await this.http.put<any>(`admin/business-platform/businesses/${id}/`, {
        is_active: isActive,
      });
    }
  }

  public async deleteBusiness(id: number | string, deleteOwner: boolean = false): Promise<any> {
    return await this.http.delete<any>(`admin/business-platform/businesses/${id}/?delete_owner=${deleteOwner}`);
  }

  public async exportBusinessLicense(businessId: number | string): Promise<any> {
    return await this.http.get<any>(`admin/business-platform/businesses/${businessId}/license-export/`);
  }

  public async bulkImportBusinesses(formData: FormData): Promise<any> {
    return await this.http.post<any>('admin/business-platform/businesses/bulk-import/', formData);
  }

  public async sendBulkEmail(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/business-platform/businesses/bulk-email/', data);
  }

  public async getSettings(): Promise<any> {
    try {
      return await this.http.get<any>('admin/white-label/settings/');
    } catch {
      return await this.http.get<any>('admin/business-platform/settings/');
    }
  }

  public async saveSettings(data: unknown): Promise<any> {
    try {
      return await this.http.post<any>('admin/white-label/settings/', data);
    } catch {
      return await this.http.post<any>('admin/business-platform/settings/', data);
    }
  }

  public async getPlanPricing(): Promise<any> {
    return await this.http.get<any>('admin/white-label/plans/pricing/');
  }

  public async savePlanPricing(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/white-label/plans/pricing/', data);
  }

  public async getNotifications(): Promise<any> {
    return await this.http.get<any>('admin/business-platform/notifications/');
  }

  public async markNotificationRead(id: number | string): Promise<any> {
    return await this.http.post<any>(`admin/business-platform/notifications/${id}/read/`, {});
  }

  public async markAllNotificationsRead(): Promise<any> {
    return await this.http.post<any>('admin/business-platform/notifications/mark-all-read/', {});
  }

  public async getPerformanceAnalytics(): Promise<any> {
    return await this.http.get<any>('admin/business-platform/analytics/performance/');
  }

  public async getDormantBusinesses(): Promise<any> {
    return await this.http.get<any>('admin/business-platform/analytics/dormant/');
  }

  public async getInactivePaidUsers(params: Record<string, unknown> | URLSearchParams | string = ''): Promise<any> {
    const qs = typeof params === 'string'
      ? params
      : params instanceof URLSearchParams
        ? params.toString()
        : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`admin/business-platform/analytics/inactive-paid-users/${qs ? `?${qs}` : ''}`);
  }

  public async verifyTransfer(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/business-platform/verify-transfer/', data);
  }

  public async getAiCreditPurchases(): Promise<any> {
    return await this.http.get<any>('ai-credits/admin/purchases/');
  }

  public async getAiCreditStats(): Promise<any> {
    return await this.http.get<any>('ai-credits/admin/stats/');
  }

  public async addAiCreditsToBusiness(data: unknown): Promise<any> {
    return await this.http.post<any>('ai-credits/admin/add-to-business/', data);
  }

  public async approveAiCreditPurchase(purchaseId: number | string): Promise<any> {
    return await this.http.post<any>(`ai-credits/admin/approve/${purchaseId}/`, {});
  }

  public async rejectAiCreditPurchase(purchaseId: number | string, reason: string = 'Rejected by admin'): Promise<any> {
    return await this.http.post<any>(`ai-credits/admin/reject/${purchaseId}/`, { reason });
  }

  public async getStaff(): Promise<any> {
    try {
      return await this.http.get<any>('admin/white-label/staff/');
    } catch {
      return await this.http.get<any>('admin/business-platform/staff/');
    }
  }

  public async createStaff(data: unknown): Promise<any> {
    try {
      return await this.http.post<any>('admin/white-label/staff/create/', data);
    } catch {
      return await this.http.post<any>('admin/business-platform/staff/create/', data);
    }
  }

  public async getFinanceWallets(query: string = ''): Promise<any> {
    return await this.http.get<any>(`admin/white-label/finance/wallets/?search=${encodeURIComponent(query)}`);
  }

  public async getBankTransfers(params: Record<string, unknown> | string = 'status=pending'): Promise<any> {
    const qs = typeof params === 'string'
      ? params
      : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`admin/white-label/finance/bank-transfers/${qs ? `?${qs}` : ''}`);
  }

  public async creditFinanceWallet(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/white-label/finance/wallets/', data);
  }

  public async actionBankTransfer(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/white-label/finance/bank-transfers/', data);
  }

  public async testEmail(payload: unknown): Promise<any> {
    return await this.http.post<any>('admin/white-label/settings/test-email/', payload);
  }
}

export class AdminPlatformChatSubmodule {
  constructor(private http: HttpClient) {}

  public async getChannels(): Promise<any> {
    return await this.http.get<any>('admin/white-label/chat/channels/');
  }

  public async getUnreadSummary(context: string = 'platform'): Promise<any> {
    return await this.http.get<any>(`chat/unread-summary/?context=${context}`);
  }

  public async acknowledge(data: unknown): Promise<any> {
    return await this.http.post<any>('chat/ack/', data);
  }

  public async getChannelMessages(channel: string): Promise<any> {
    return await this.http.get<any>(`admin/white-label/chat/messages/?channel=${encodeURIComponent(channel)}`);
  }

  public async getDirectMessages(recipientId: number | string): Promise<any> {
    return await this.http.get<any>(`admin/white-label/chat/direct/?recipient_id=${recipientId}`);
  }

  public async uploadAttachment(formData: FormData, context: string = 'platform'): Promise<any> {
    return await this.http.post<any>(`chat/upload/?context=${context}`, formData);
  }

  public async sendChannelMessage(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/white-label/chat/messages/', data);
  }

  public async sendDirectMessage(data: unknown): Promise<any> {
    return await this.http.post<any>('admin/white-label/chat/direct/', data);
  }
}

export class AdminProfessionalServicesSubmodule {
  constructor(private http: HttpClient) {}

  public async list(url: string = 'admin/professional-services/'): Promise<any> {
    return await this.http.get<any>(url);
  }

  public async getById(id: number | string): Promise<any> {
    return await this.http.get<any>(`admin/professional-services/${id}/`);
  }

  public async updateCatalog(data: unknown): Promise<any> {
    return await this.http.put<any>('admin/professional-services/catalog/', data);
  }

  public async paymentAction(paymentId: number | string, data: unknown): Promise<any> {
    return await this.http.post<any>(`admin/professional-services/payments/${paymentId}/action/`, data);
  }

  public async sendMessage(requestId: number | string, data: unknown): Promise<any> {
    return await this.http.post<any>(`admin/professional-services/${requestId}/messages/`, data);
  }

  public async updateRequest(requestId: number | string, data: unknown): Promise<any> {
    return await this.http.put<any>(`admin/professional-services/${requestId}/`, data);
  }
}

export class AdminModule {
  public customerErrors: AdminCustomerErrorsSubmodule;
  public delivery: AdminDeliverySubmodule;
  public staff: AdminStaffSubmodule;
  public security: AdminSecuritySubmodule;
  public platform: AdminPlatformSubmodule;
  public professionalServices: AdminProfessionalServicesSubmodule;
  public emailVerifications: AdminEmailVerificationSubmodule;
  public chat: AdminPlatformChatSubmodule;

  constructor(private http: HttpClient) {
    this.customerErrors = new AdminCustomerErrorsSubmodule(this.http);
    this.delivery = new AdminDeliverySubmodule(this.http);
    this.staff = new AdminStaffSubmodule(this.http);
    this.security = new AdminSecuritySubmodule(this.http);
    this.platform = new AdminPlatformSubmodule(this.http);
    this.professionalServices = new AdminProfessionalServicesSubmodule(this.http);
    this.emailVerifications = new AdminEmailVerificationSubmodule(this.http);
    this.chat = new AdminPlatformChatSubmodule(this.http);
  }

  public async getPlatformAnalytics(): Promise<any> {
    try {
      return await this.http.get<any>('admin/platform-analytics/');
    } catch {
      return await this.http.get<any>('admin/business-platform/analytics/');
    }
  }

  public async updatePlatformAnalytics(data: unknown): Promise<any> {
    try {
      return await this.http.post<any>('admin/platform-analytics/', data);
    } catch {
      return await this.http.post<any>('admin/business-platform/analytics/', data);
    }
  }

  public async getUsers(): Promise<any> {
    return await this.http.get<any>('admin-users/');
  }

  public async deleteUser(id: number | string): Promise<any> {
    return await this.http.delete<any>(`admin-users/${id}/`);
  }

  public async getActiveSubscriptions(): Promise<any> {
    return await this.http.get<any>('admin/active-subscriptions/');
  }

  public async getInstitutions(): Promise<any> {
    return await this.http.get<any>('admin/institutions/');
  }

  public async getInstitutionFeatures(id: number | string): Promise<any> {
    return await this.http.get<any>(`admin/institutions/${id}/features/`);
  }

  public async updateInstitutionFeatures(id: number | string, data: unknown): Promise<any> {
    return await this.http.put<any>(`admin/institutions/${id}/features/`, data);
  }
}

export class AdminEmailVerificationSubmodule {
  constructor(private http: HttpClient) {}

  public async list(params: Record<string, unknown> = {}): Promise<any> {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        q.append(k, String(v));
      }
    });
    const qs = q.toString();
    return await this.http.get<any>(`admin/email-verifications/${qs ? `?${qs}` : ''}`);
  }

  public async manualVerify(userId: number | string): Promise<any> {
    return await this.http.post<any>('admin/email-verifications/manual-verify/', { user_id: userId });
  }

  public async resendOtp(userId: number | string): Promise<any> {
    return await this.http.post<any>('admin/email-verifications/resend-otp/', { user_id: userId });
  }

  public async generateDirectLink(userId: number | string): Promise<any> {
    return await this.http.post<any>('admin/email-verifications/generate-direct-link/', { user_id: userId });
  }
}

