import { HttpClient } from './client.js';

export class ServicesModule {
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

  // --- Services Catalog ---
  public async list(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/services/${this.buildQuery(params)}`);
  }

  public async getServices(params: Record<string, unknown> = {}): Promise<any> {
    return this.list(params);
  }

  public async createService(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/services/', data);
  }

  public async updateService(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/services/${id}/`, data);
  }

  public async deleteService(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/services/${id}/`);
  }

  // --- Bookings ---
  public async getBookings(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-bookings/${this.buildQuery(params)}`).catch(() =>
      this.http.get<any>(`business/bookings/${this.buildQuery(params)}`)
    );
  }

  public async createBooking(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/bookings/', data).catch(() =>
      this.http.post<any>('business/service-bookings/', data)
    );
  }

  public async updateBooking(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/bookings/${id}/`, data).catch(() =>
      this.http.put<any>(`business/service-bookings/${id}/`, data)
    );
  }

  public async deleteBooking(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/bookings/${id}/`).catch(() =>
      this.http.delete<any>(`business/service-bookings/${id}/`)
    );
  }

  // --- Inquiries ---
  public async getInquiries(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-inquiries/${this.buildQuery(params)}`).catch(() =>
      this.http.get<any>(`business/inquiries/${this.buildQuery(params)}`)
    );
  }

  public async updateInquiry(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/inquiries/${id}/`, data);
  }

  public async respondToInquiry(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/inquiries/${id}/respond/`, data);
  }

  // --- Invoices ---
  public async getInvoices(params: Record<string, unknown> = {}): Promise<any> {
    const qs = this.buildQuery(params);
    return await this.http.get<any>(`business/service-invoices/${qs}`).catch(() =>
      this.http.get<any>(`business/invoices/${qs}`)
    );
  }

  public async getInvoiceById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/service-invoices/${id}/`).catch(() =>
      this.http.get<any>(`business/invoices/${id}/`)
    );
  }

  public async createInvoice(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/service-invoices/', data).catch(() =>
      this.http.post<any>('business/invoices/', data)
    );
  }

  public async updateInvoice(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/service-invoices/${id}/`, data).catch(() =>
      this.http.put<any>(`business/invoices/${id}/`, data)
    );
  }

  public async deleteInvoice(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/service-invoices/${id}/`).catch(() =>
      this.http.delete<any>(`business/invoices/${id}/`)
    );
  }

  public async sendInvoice(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/service-invoices/${id}/send/`, {});
  }

  public async sendInvoiceReminder(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/service-invoices/${id}/reminder/`, {});
  }

  // --- Dashboards & Stats ---
  public async getDashboard(): Promise<any> {
    return await this.http.get<any>('business/services/dashboard/').catch(() =>
      this.http.get<any>('business/services-dashboard/')
    );
  }

  public async getServicesDashboard(): Promise<any> {
    return await this.http.get<any>('business/services-dashboard/').catch(() =>
      this.http.get<any>('business/services/dashboard/')
    );
  }

  public async getDashboardStats(): Promise<any> {
    return await this.http.get<any>('business/service-dashboard/stats/').catch(() =>
      this.getStats()
    );
  }

  public async getDashboardProjects(): Promise<any> {
    return await this.http.get<any>('business/service-dashboard/projects/');
  }

  public async getDashboardTransactions(): Promise<any> {
    return await this.http.get<any>('business/service-dashboard/transactions/');
  }

  public async getDashboardSchedule(): Promise<any> {
    return await this.http.get<any>('business/service-dashboard/schedule/');
  }

  public async getDashboardActivity(): Promise<any> {
    return await this.http.get<any>('business/service-dashboard/activity/');
  }

  public async getPendingInvoicePayments(): Promise<any> {
    return await this.http.get<any>('business/invoice-payments/pending/');
  }

  public async approveInvoicePayment(invoiceId: number | string): Promise<any> {
    return await this.http.post<any>(`business/invoice-payments/${invoiceId}/approve/`, {});
  }

  public async rejectInvoicePayment(invoiceId: number | string, data: Record<string, unknown> | string): Promise<any> {
    const payload = typeof data === 'string' ? { rejection_reason: data } : data;
    return await this.http.post<any>(`business/invoice-payments/${invoiceId}/reject/`, payload);
  }

  public async getStats(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-stats/${this.buildQuery(params)}`);
  }

  public async getAnalytics(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-analytics/${this.buildQuery(params)}`);
  }

  public async getRevenueReports(params: Record<string, unknown> = {}): Promise<any> {
    const qs = this.buildQuery(params);
    return await this.http.get<any>(`business/service-revenue/${qs}`).catch(() =>
      this.http.get<any>(`business/service-revenue-reports/${qs}`)
    );
  }

  // --- Requests ---
  public async getRequests(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-requests/${this.buildQuery(params)}`);
  }

  public async updateRequest(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/service-requests/${id}/`, data);
  }

  // --- Jobs ---
  public async getJobs(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? (params.startsWith('?') ? params : `?${params}`) : this.buildQuery(params);
    return await this.http.get<any>(`business/service-jobs/${qs}`);
  }

  public async createJob(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/service-jobs/', data);
  }

  public async updateJob(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/service-jobs/${id}/`, data);
  }

  public async deleteJob(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/service-jobs/${id}/`);
  }

  public async bulkImportJobs(payload: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.post<any>('business/service-jobs/bulk-import/', payload);
  }

  public async getBulkImportTemplate(): Promise<Blob> {
    return await this.http.getBlob('business/service-jobs/bulk-import/template/');
  }

  // --- Projects ---
  public async getProjects(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-projects/${this.buildQuery(params)}`).catch(() =>
      this.http.get<any>(`business/projects/${this.buildQuery(params)}`)
    );
  }

  public async createProject(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/projects/', data).catch(() =>
      this.http.post<any>('business/service-projects/', data)
    );
  }

  public async updateProject(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/projects/${id}/`, data).catch(() =>
      this.http.put<any>(`business/service-projects/${id}/`, data)
    );
  }

  public async deleteProject(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/projects/${id}/`).catch(() =>
      this.http.delete<any>(`business/service-projects/${id}/`)
    );
  }

  // --- Leads & Campaigns ---
  public async getLeads(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/leads/${this.buildQuery(params)}`);
  }

  public async createLead(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/leads/', data);
  }

  public async updateLead(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/leads/${id}/`, data);
  }

  public async deleteLead(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/leads/${id}/`);
  }

  public async getEmailCampaigns(): Promise<any> {
    return await this.http.get<any>('business/email-campaigns/');
  }

  public async createEmailCampaign(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/email-campaigns/', data);
  }

  // --- Clients ---
  public async getClients(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-clients/${this.buildQuery(params)}`);
  }

  public async createClient(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/service-clients/', data);
  }

  public async updateClient(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/service-clients/${id}/`, data).catch(() =>
      this.http.post<any>(`business/service-clients/${id}/`, data)
    );
  }

  public async deleteClient(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/service-clients/${id}/`);
  }

  // --- Team Members ---
  public async getTeam(): Promise<any> {
    return await this.http.get<any>('business/service-team/').catch(() =>
      this.http.get<any>('business/team-members/')
    );
  }

  public async getTeamMembers(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/team-members/${this.buildQuery(params)}`).catch(() =>
      this.http.get<any>(`business/service-team/${this.buildQuery(params)}`)
    );
  }

  public async createTeamMember(data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.post<any>('business/team-members/', data);
  }

  public async updateTeamMember(id: number | string, data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.put<any>(`business/team-members/${id}/`, data);
  }

  public async deleteTeamMember(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/team-members/${id}/`);
  }

  // --- Settings & Testimonials ---
  public async getSettings(): Promise<any> {
    return await this.http.get<any>('business/service-settings/');
  }

  public async updateSettings(data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>('business/service-settings/', data);
  }

  public async getTestimonials(): Promise<any> {
    return await this.http.get<any>('business/testimonials/');
  }

  public async createTestimonial(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/testimonials/', data);
  }

  public async deleteTestimonial(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/testimonials/${id}/`);
  }

  public async uploadImage(formData: FormData): Promise<any> {
    return await this.http.post<any>('business/upload-image/', formData);
  }

  // --- Service Expenses ---
  public async getExpenseCategories(): Promise<any> {
    return await this.http.get<any>('business/service-expenses/categories/');
  }

  public async createExpenseCategory(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/service-expenses/categories/', data);
  }

  public async getExpenses(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-expenses/${this.buildQuery(params)}`);
  }

  public async createExpense(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/service-expenses/', data);
  }

  public async updateExpense(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/service-expenses/${id}/`, data);
  }

  public async deleteExpense(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/service-expenses/${id}/`);
  }

  public async getExpenseSummary(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/service-expenses/summary/${this.buildQuery(params)}`);
  }

  // --- Email Templates ---
  public async getEmailTemplates(): Promise<any> {
    return await this.http.get<any>('business/email-templates/');
  }

  public async createEmailTemplate(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/email-templates/', data);
  }

  public async updateEmailTemplate(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/email-templates/${id}/`, data);
  }

  public async deleteEmailTemplate(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/email-templates/${id}/`);
  }

  // --- Reviews ---
  public async getReviews(): Promise<any> {
    return await this.http.get<any>('business/reviews/');
  }

  public async createReview(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/reviews/', data);
  }

  public async updateReview(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/reviews/${id}/`, data);
  }

  public async deleteReview(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/reviews/${id}/`);
  }

  // --- Portfolio ---
  public async getPortfolio(): Promise<any> {
    return await this.http.get<any>('business/portfolio/');
  }

  public async createPortfolioItem(data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.post<any>('business/portfolio/', data);
  }

  public async updatePortfolioItem(id: number | string, data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.put<any>(`business/portfolio/${id}/`, data);
  }

  public async deletePortfolioItem(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/portfolio/${id}/`);
  }

  // --- Announcements ---
  public async getAnnouncements(): Promise<any> {
    return await this.http.get<any>('business/announcements/');
  }

  public async createAnnouncement(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/announcements/', data);
  }

  public async updateAnnouncement(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/announcements/${id}/`, data);
  }

  public async deleteAnnouncement(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/announcements/${id}/`);
  }

  public async sendAnnouncement(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/announcements/${id}/send/`, {});
  }

  // --- Blog ---
  public async getBlogPosts(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/blog/posts/${this.buildQuery(params)}`).catch(() =>
      this.http.get<any>(`business/blog/${this.buildQuery(params)}`)
    );
  }

  public async getBlogPostById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/blog/posts/${id}/`).catch(() =>
      this.http.get<any>(`business/blog/${id}/`)
    );
  }

  public async createBlogPost(data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.post<any>('business/blog/posts/', data).catch(() =>
      this.http.post<any>('business/blog/', data)
    );
  }

  public async updateBlogPost(id: number | string, data: Record<string, unknown> | FormData): Promise<any> {
    return await this.http.put<any>(`business/blog/posts/${id}/`, data).catch(() =>
      this.http.put<any>(`business/blog/${id}/`, data)
    );
  }

  public async deleteBlogPost(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/blog/posts/${id}/`).catch(() =>
      this.http.delete<any>(`business/blog/${id}/`)
    );
  }

  // --- Client Portal & Messages ---
  public async getClientPortalDashboard(slug?: string): Promise<any> {
    const endpoint = slug ? `client/dashboard/${slug}/` : 'client/dashboard/';
    return await this.http.get<any>(endpoint);
  }

  public async sendClientPortalMessage(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('client/messages/', data);
  }

  public async getClientConversations(): Promise<any> {
    return await this.http.get<any>('business/client-messages/');
  }

  public async getClientMessages(clientId: number | string): Promise<any> {
    return await this.http.get<any>(`business/client-messages/${clientId}/`);
  }

  public async sendClientMessage(clientId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/client-messages/${clientId}/`, data);
  }

  // --- Professional Services ---
  public async getProfessionalServices(params: Record<string, unknown> = {}): Promise<any> {
    return await this.http.get<any>(`business/professional-services/${this.buildQuery(params)}`);
  }

  public async getProfessionalServiceById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/professional-services/${id}/`);
  }

  public async createProfessionalServiceRequest(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/professional-services/', data);
  }

  public async deleteProfessionalServiceRequest(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/professional-services/${id}/`);
  }

  public async submitProfessionalServiceReview(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/professional-services/${id}/review/`, data);
  }

  public async sendProfessionalServiceMessage(id: number | string, message: string): Promise<any> {
    return await this.http.post<any>(`business/professional-services/${id}/messages/`, { message });
  }

  public async initiateProfessionalServicePayment(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/professional-services/${id}/payments/initiate/`, data);
  }

  public async verifyProfessionalServicePayment(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/professional-services/payments/verify/', data);
  }

  // --- Proposals ---
  public async getProposals(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/proposals/${qs ? `?${qs}` : ''}`);
  }

  public async getProposalTemplates(): Promise<any> {
    return await this.http.get<any>('business/proposals/templates/');
  }

  public async getProposalById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/proposals/${id}/`);
  }

  public async createProposal(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/proposals/create/', data);
  }

  public async updateProposal(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/proposals/${id}/`, data);
  }

  public async deleteProposal(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/proposals/${id}/`);
  }

  public async sendProposal(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/proposals/${id}/send/`, {});
  }

  public async duplicateProposal(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/proposals/${id}/duplicate/`, {});
  }
}

