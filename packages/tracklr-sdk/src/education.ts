import { HttpClient } from './client.js';

export class EducationModule {
  constructor(private http: HttpClient) {}

  public async getTeacherStudents(): Promise<any> {
    return await this.http.get<any>('school/teacher/students/');
  }

  public async getPublishedStudents(itemType: 'test' | 'exam', itemId: number | string): Promise<any> {
    const endpoint = itemType === 'test'
      ? `school/teacher/tests/${itemId}/published-students/`
      : `school/teacher/exams/${itemId}/published-students/`;
    return await this.http.get<any>(endpoint);
  }

  public async publishToStudents(itemType: 'test' | 'exam', itemId: number | string, payload: unknown): Promise<any> {
    const endpoint = itemType === 'test'
      ? `school/teacher/tests/${itemId}/publish/`
      : `school/teacher/exams/${itemId}/publish-to-students/`;
    return await this.http.post<any>(endpoint, payload);
  }

  public async unpublishStudents(itemType: 'test' | 'exam', itemId: number | string): Promise<any> {
    const endpoint = itemType === 'test'
      ? `school/teacher/tests/${itemId}/unpublish/`
      : `school/teacher/exams/${itemId}/unpublish-from-students/`;
    return await this.http.post<any>(endpoint, { unpublish_all: true });
  }

  public async getPublishingData(endpoint: string): Promise<any> {
    return await this.http.get<any>(endpoint);
  }

  public async publishResults(endpoint: string, payload: unknown): Promise<any> {
    return await this.http.post<any>(endpoint, payload);
  }

  public async unpublishAll(endpoint: string): Promise<any> {
    return await this.http.post<any>(endpoint, { unpublish_all: true });
  }

  public async verifyPayment(params: URLSearchParams | Record<string, unknown> | string): Promise<any> {
    const qs = typeof params === 'string'
      ? params
      : params instanceof URLSearchParams
        ? params.toString()
        : new URLSearchParams(params as Record<string, string>).toString();
    return await this.http.get<any>(`school/payment/verify/${qs ? `?${qs}` : ''}`);
  }

  public async getStudentWallet(studentId?: string | number): Promise<any> {
    const query = studentId ? `?student_id=${studentId}` : '';
    return await this.http.get<any>(`school/student/wallet/${query}`);
  }

  public async getStudentWalletTransactions(params?: Record<string, unknown> | string | number): Promise<any> {
    let query = '';
    if (typeof params === 'number' || typeof params === 'string') {
      query = params ? `?student_id=${params}` : '';
    } else if (params && typeof params === 'object') {
      const q = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') q.append(k, String(v));
      });
      const qs = q.toString();
      query = qs ? `?${qs}` : '';
    }
    return await this.http.get<any>(`school/student/wallet/transactions/${query}`);
  }

  public async depositToStudentWallet(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('school/student/wallet/deposit/', payload);
  }

  public async getPaymentBreakdown(studentId?: string | number): Promise<any> {
    const query = studentId ? `?student_id=${studentId}` : '';
    return await this.http.get<any>(`school/parent/payment-breakdown/${query}`);
  }

  public async getStudentFees(): Promise<any> {
    return await this.http.get<any>('school/student/fees/');
  }

  public async payFeeFromWallet(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('school/student/pay-fee-from-wallet/', payload);
  }

  public async initiateStudentPayment(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('school/student/initiate-payment/', payload);
  }

  public async getTeacherSubjects(): Promise<any> {
    return await this.http.get<any>('school/teacher/subjects/');
  }

  public async getSubjects(): Promise<any> {
    return await this.http.get<any>('subjects/');
  }

  public async getAllSubjects(): Promise<any> {
    return await this.http.get<any>('subjects/all/');
  }

  public async createSubject(payload: unknown): Promise<any> {
    return await this.http.post<any>('subjects/create/', payload);
  }

  public async updateSubject(id: number | string, payload: unknown): Promise<any> {
    return await this.http.put<any>(`subjects/${id}/update/`, payload);
  }

  public async deleteSubject(id: number | string): Promise<any> {
    return await this.http.delete<any>(`subjects/${id}/delete/`);
  }

  public async getQuestionBankQuestions(examType?: string): Promise<any> {
    const query = examType ? `?exam_type=${examType}` : '';
    return await this.http.get<any>(`question-bank/questions/${query}`);
  }

  public async uploadQuestionBankImage(formData: FormData): Promise<any> {
    return await this.http.post<any>('question-bank/questions/upload-image/', formData);
  }

  public async createQuestionBankQuestion(payload: unknown): Promise<any> {
    return await this.http.post<any>('question-bank/questions/create/', payload);
  }

  public async importQuestionBankText(payload: unknown): Promise<any> {
    return await this.http.post<any>('question-bank/import-text/', payload);
  }

  public async importQuestionBankFile(endpoint: string, formData: FormData): Promise<any> {
    return await this.http.post<any>(endpoint, formData);
  }
}
