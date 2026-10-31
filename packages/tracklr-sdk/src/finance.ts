import { HttpClient } from './client.js';

export interface LiquidAccountPayload {
  name: string;
  method_type: string;
  bank_name?: string;
  account_number?: string;
  opening_balance?: number;
  allow_overdraft?: boolean;
  is_default?: boolean;
  [key: string]: unknown;
}

export class FinanceModule {
  constructor(private http: HttpClient) {}

  public async getLiquidAccounts(): Promise<any> {
    return await this.http.get<any>('business/cash-book/accounts/');
  }

  public async getPaymentMethods(): Promise<any> {
    return await this.http.get<any>('business/payment-methods/');
  }

  public async createLiquidAccount(data: LiquidAccountPayload): Promise<any> {
    return await this.http.post<any>('business/cash-book/accounts/', data);
  }

  public async updateLiquidAccount(id: number | string, data: Partial<LiquidAccountPayload>): Promise<any> {
    return await this.http.put<any>(`business/cash-book/accounts/${id}/`, data);
  }

  public async deleteLiquidAccount(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/cash-book/accounts/${id}/`);
  }

  public async transferBetweenAccounts(payload: unknown): Promise<any> {
    return await this.http.post<any>('business/cash-book/transfers/', payload);
  }

  public async getTrialBalance(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`business/finance/trial-balance/${queryString ? `?${queryString}` : ''}`);
  }

  public async getBalanceSheet(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    const queryString = query.toString();
    return await this.http.get<any>(`business/finance/balance-sheet/${queryString ? `?${queryString}` : ''}`);
  }

  public async getOverviewKPIs(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/finance/overview/${qs ? `?${qs}` : ''}`);
  }

  public async getExpenses(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/expenses/${qs ? `?${qs}` : ''}`);
  }

  public async createExpense(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/expenses/', data);
  }

  public async updateExpense(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/expenses/${id}/`, data);
  }

  public async deleteExpense(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/expenses/${id}/`);
  }

  public async getExpenseCategories(): Promise<any> {
    return await this.http.get<any>('business/expense-categories/');
  }

  public async createExpenseCategory(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/expense-categories/', data);
  }

  public async getProfitAnalysis(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/profit-analysis/${qs ? `?${qs}` : ''}`);
  }

  public async getFinancialProjections(): Promise<any> {
    return await this.http.get<any>('business/financial-projections/');
  }

  public async getPendingApprovals(): Promise<any> {
    return await this.http.get<any>('business/payments/pending-approvals/');
  }

  public async verifyPayment(reference: string): Promise<any> {
    return await this.http.get<any>(`business/payments/verify/?reference=${encodeURIComponent(reference)}`);
  }

  public async verifyWalletDeposit(reference: string): Promise<any> {
    return await this.http.get<any>(`business/wallet/verify-deposit/?reference=${encodeURIComponent(reference)}`);
  }

  public async getIncome(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? params : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`business/finance/income/${qs ? `?${qs}` : ''}`);
  }

  public async createIncome(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/income/', data);
  }

  public async deleteIncome(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/finance/income/${id}/`);
  }

  public async getRecurringExpenses(): Promise<any> {
    return await this.http.get<any>('business/finance/recurring-expenses/');
  }

  public async createRecurringExpense(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/recurring-expenses/', data);
  }

  public async getProfitAndLoss(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? params : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`business/finance/profit-loss/${qs ? `?${qs}` : ''}`);
  }

  public async getExpenseSummary(options?: { branchId?: number | string; period?: string } | number | string): Promise<any> {
    if (typeof options === 'object' && options !== null) {
      const query = new URLSearchParams();
      if (options.branchId && options.branchId !== 'all') query.append('branch_id', String(options.branchId));
      if (options.period) query.append('period', options.period);
      const qs = query.toString();
      return await this.http.get<any>(`business/expenses/summary/${qs ? `?${qs}` : ''}`);
    }
    const query = options && options !== 'all' ? `?branch_id=${options}` : '';
    return await this.http.get<any>(`business/expenses/summary/${query}`);
  }

  public async getBalanceSheets(): Promise<any> {
    return await this.http.get<any>('business/accounts/balance-sheets/');
  }

  public async getAutoPopulatedBalanceSheet(): Promise<any> {
    return await this.http.get<any>('business/accounts/balance-sheets/auto-populate/');
  }

  public async createBalanceSheet(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/accounts/balance-sheets/', data);
  }

  public async updateBalanceSheet(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/accounts/balance-sheets/${id}/`, data);
  }

  public async deleteBalanceSheet(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/accounts/balance-sheets/${id}/`);
  }

  public async getCashFlows(): Promise<any> {
    return await this.http.get<any>('business/accounts/cash-flows/');
  }

  public async createCashFlow(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/accounts/cash-flows/', data);
  }

  public async updateCashFlow(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/accounts/cash-flows/${id}/`, data);
  }

  public async deleteCashFlow(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/accounts/cash-flows/${id}/`);
  }

  public async verifyCustomerCredit(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    return await this.http.get<any>(`business/customer/credit/verify/?${query.toString()}`);
  }

  public async verifyCustomerPurchase(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    return await this.http.get<any>(`business/customer/purchase/verify/?${query.toString()}`);
  }

  public async verifyWalletFund(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, String(v));
      }
    });
    return await this.http.get<any>(`business/customer/wallet/fund/verify/?${query.toString()}`);
  }

  public async getCashBook(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? params : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`business/cash-book/${qs ? `?${qs}` : ''}`);
  }

  public async fixOpeningBalance(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/fix-opening-balance/', data);
  }

  public async getPurchaseOrders(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? params : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`business/finance/purchase-orders/${qs ? `?${qs}` : ''}`);
  }

  public async getPurchaseOrderById(id: number | string): Promise<any> {
    return await this.http.get<any>(`business/finance/purchase-orders/${id}/`);
  }

  public async createPurchaseOrder(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/purchase-orders/', data);
  }

  public async approvePurchaseOrder(id: number | string): Promise<any> {
    return await this.http.post<any>(`business/finance/purchase-orders/${id}/approve/`, {});
  }

  public async receivePurchaseOrder(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/finance/purchase-orders/${id}/receive/`, data);
  }

  public async payPurchaseOrder(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/finance/purchase-orders/${id}/pay/`, data);
  }

  public async updatePurchaseOrderSettings(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/purchase-orders/settings/', data);
  }

  public async getPurchases(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? params : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`business/finance/purchases/${qs ? `?${qs}` : ''}`);
  }

  public async getJournalEntries(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? params : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`business/finance/journal/${qs ? `?${qs}` : ''}`);
  }

  public async createJournalEntry(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/journal/create/', data);
  }

  public async reverseJournalEntry(id: number | string, reason: string): Promise<any> {
    return await this.http.post<any>(`business/finance/journal/${id}/reverse/`, { reason });
  }

  public async getFinanceAccounts(): Promise<any> {
    return await this.http.get<any>('business/finance/accounts/');
  }

  public async getBankReconciliationSessions(): Promise<any> {
    return await this.http.get<any>('business/finance/bank-reconciliation/');
  }

  public async createBankReconciliationSession(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/bank-reconciliation/', data);
  }

  public async uploadBankReconciliationStatement(sessionId: number | string, formData: FormData): Promise<any> {
    return await this.http.post<any>(`business/finance/bank-reconciliation/${sessionId}/upload/`, formData);
  }

  public async getBankReconciliationWorkspace(sessionId: number | string): Promise<any> {
    return await this.http.get<any>(`business/finance/bank-reconciliation/${sessionId}/workspace/`);
  }

  public async autoMatchBankReconciliation(sessionId: number | string): Promise<any> {
    return await this.http.post<any>(`business/finance/bank-reconciliation/${sessionId}/auto-match/`, {});
  }

  public async matchBankReconciliationLine(sessionId: number | string, lineId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/finance/bank-reconciliation/${sessionId}/lines/${lineId}/match/`, data);
  }

  public async adjustBankReconciliationLine(sessionId: number | string, lineId: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/finance/bank-reconciliation/${sessionId}/lines/${lineId}/adjustment/`, data);
  }

  public async finalizeBankReconciliation(sessionId: number | string): Promise<any> {
    return await this.http.post<any>(`business/finance/bank-reconciliation/${sessionId}/finalize/`, {});
  }

  public async getCapitalMeta(): Promise<any> {
    return await this.http.get<any>('business/finance/capital-accounting/meta/');
  }

  public async getCapitalTransactions(params: Record<string, unknown> | string = {}): Promise<any> {
    const qs = typeof params === 'string' ? params : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`business/finance/capital-accounting/transactions/${qs ? `?${qs}` : ''}`);
  }

  public async createCapitalTransaction(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/capital-accounting/transactions/create/', data);
  }

  public async voidCapitalTransaction(txnId: number | string, reason: string): Promise<any> {
    return await this.http.post<any>(`business/finance/capital-accounting/transactions/${txnId}/void/`, { reason });
  }

  public async createCapitalAccount(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/capital-accounting/accounts/', data);
  }

  public async getCapitalDepreciationPreview(asOfDate: string): Promise<any> {
    return await this.http.get<any>(`business/finance/capital-accounting/depreciation/preview/?as_of_date=${encodeURIComponent(asOfDate)}`);
  }

  public async runCapitalDepreciation(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/capital-accounting/depreciation/run/', data);
  }

  public async getCapitalLoanAmortization(txnId: number | string, tenureMonths: number, method: string): Promise<any> {
    return await this.http.get<any>(`business/finance/capital-accounting/loans/${txnId}/amortization/?tenure_months=${tenureMonths}&method=${encodeURIComponent(method)}`);
  }

  public async calculateCapitalLoanAmortization(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/finance/capital-accounting/loans/amortization-calculator/', data);
  }

  public async getCapitalAnalytics(monthsBack: number): Promise<any> {
    return await this.http.get<any>(`business/finance/capital-accounting/analytics/?months_back=${monthsBack}`);
  }

  public async getReports(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        query.append(k, String(v));
      }
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/reports/${qs ? `?${qs}` : ''}`);
  }

  // --- Goals ---
  public async getGoals(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/goals/${qs ? `?${qs}` : ''}`);
  }

  public async getGoalsCalendar(params: Record<string, unknown> = {}): Promise<any> {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, String(v));
    });
    const qs = query.toString();
    return await this.http.get<any>(`business/goals/calendar/${qs ? `?${qs}` : ''}`);
  }

  public async createGoal(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/goals/create/', data);
  }

  public async updateGoal(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.put<any>(`business/goals/${id}/`, data);
  }

  public async deleteGoal(id: number | string): Promise<any> {
    return await this.http.delete<any>(`business/goals/${id}/`);
  }

  public async updateGoalProgress(id: number | string, data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>(`business/goals/${id}/progress/`, data);
  }

  // --- Financial Projections ---
  public async getFinancialIncomeProjections(months: number = 6): Promise<any> {
    return await this.http.get<any>(`business/financial-projections/income/?months=${months}`);
  }

  public async getFinancialExpenseProjections(months: number = 6): Promise<any> {
    return await this.http.get<any>(`business/financial-projections/expenses/?months=${months}`);
  }

  public async getFinancialCashFlowProjections(months: number = 6): Promise<any> {
    return await this.http.get<any>(`business/financial-projections/cash-flow/?months=${months}`);
  }

  public async getFinancialProfitProjections(months: number = 6): Promise<any> {
    return await this.http.get<any>(`business/financial-projections/profit/?months=${months}`);
  }

  public async runFinancialScenario(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/financial-projections/scenario/', data);
  }

  // --- Tax & Approvals ---
  public async getTaxRevenue(): Promise<any> {
    return await this.http.get<any>('business/tax/revenue/');
  }

  public async getStaffPayeSummary(): Promise<any> {
    return await this.http.get<any>('business/tax/staff-paye-summary/');
  }

  public async getTaxDashboard(): Promise<any> {
    return await this.http.get<any>('business/tax/dashboard/');
  }

  public async getPendingPaymentApprovals(): Promise<any> {
    return await this.http.get<any>('business/payments/pending-approvals/');
  }

  public async reviewPaymentApproval(
    saleId: number | string,
    action: 'approve' | 'reject',
    payload: Record<string, unknown> = {}
  ): Promise<any> {
    return await this.http.post<any>(`business/payments/${saleId}/${action}/`, payload);
  }

  public async payWalletFees(feeType: 'platform' | 'delivery'): Promise<any> {
    return await this.http.post<any>('business/wallet/pay-fees/', { fee_type: feeType });
  }

  public async getPlatformBankDetails(): Promise<any> {
    return await this.http.get<any>('platform/bank-details/');
  }

  public async getWalletStatus(): Promise<any> {
    return await this.http.get<any>('business/wallet/status/');
  }

  public async initiateWalletFunding(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/wallet/fund/initiate/', payload);
  }

  public async notifyWalletBankTransfer(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/wallet/bank-transfer/', payload);
  }

  public async savePaymentMethod(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/payment-methods/', payload);
  }
}

