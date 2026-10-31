import { HttpClient } from './client.js';

export class InsuranceModule {
  constructor(private http: HttpClient) {}

  public async getStats(): Promise<any> {
    return await this.http.get<any>('business/insurance/dashboard/stats/');
  }

  public async getPolicies(): Promise<any> {
    return await this.http.get<any>('business/insurance/policies/');
  }

  public async createPolicy(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/insurance/policies/', data);
  }

  public async getCooperatives(): Promise<any> {
    return await this.http.get<any>('business/insurance/cooperatives/');
  }

  public async createCooperative(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/insurance/cooperatives/', data);
  }

  public async getLgaOffices(): Promise<any> {
    return await this.http.get<any>('business/insurance/lga-offices/');
  }

  public async createLgaOffice(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/insurance/lga-offices/', data);
  }

  public async getClaims(): Promise<any> {
    return await this.http.get<any>('business/insurance/claims/');
  }

  public async createClaim(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/insurance/claims/', data);
  }

  public async getCreditNotes(): Promise<any> {
    return await this.http.get<any>('business/insurance/credit-notes/');
  }

  public async getUnderwriters(): Promise<any> {
    return await this.http.get<any>('business/insurance/underwriters/');
  }
}
