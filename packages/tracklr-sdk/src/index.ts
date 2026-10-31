import { HttpClient } from './client.js';
import { AuthModule } from './auth.js';
import { TenancyModule } from './tenancy.js';
import { RetailModule } from './retail.js';
import { ProductionModule } from './production.js';
import { CustomerModule } from './customer.js';
import { AdminModule } from './admin.js';
import { FinanceModule } from './finance.js';
import { DepartmentsModule } from './departments.js';
import { StaffModule } from './staff.js';
import { BranchesModule } from './branches.js';
import { InventoryModule } from './inventory.js';
import { SuppliersModule } from './suppliers.js';
import { DeliveryModule } from './delivery.js';
import { ServicesModule } from './services.js';
import { InsuranceModule } from './insurance.js';
import { EducationModule } from './education.js';
import { TracklrClientConfig, RequestOptions } from './types.js';

export * from './types.js';
export { HttpClient } from './client.js';
export { AuthModule } from './auth.js';
export { TenancyModule } from './tenancy.js';
export { RetailModule } from './retail.js';
export { ProductionModule } from './production.js';
export { CustomerModule } from './customer.js';
export { AdminModule } from './admin.js';
export { FinanceModule } from './finance.js';
export { DepartmentsModule } from './departments.js';
export { StaffModule } from './staff.js';
export { BranchesModule } from './branches.js';
export { InventoryModule } from './inventory.js';
export { SuppliersModule } from './suppliers.js';
export { DeliveryModule } from './delivery.js';
export { ServicesModule } from './services.js';
export { InsuranceModule } from './insurance.js';
export { EducationModule } from './education.js';

export class TracklrClient {
  public http: HttpClient;
  public auth: AuthModule;
  public tenancy: TenancyModule;
  public retail: RetailModule;
  public production: ProductionModule;
  public customer: CustomerModule;
  public admin: AdminModule;
  public finance: FinanceModule;
  public departments: DepartmentsModule;
  public staff: StaffModule;
  public branches: BranchesModule;
  public inventory: InventoryModule;
  public suppliers: SuppliersModule;
  public delivery: DeliveryModule;
  public services: ServicesModule;
  public insurance: InsuranceModule;
  public education: EducationModule;

  constructor(config: TracklrClientConfig = {}) {
    this.http = new HttpClient(config);
    this.auth = new AuthModule(this.http);
    this.tenancy = new TenancyModule(this.http);
    this.retail = new RetailModule(this.http);
    this.production = new ProductionModule(this.http);
    this.customer = new CustomerModule(this.http);
    this.admin = new AdminModule(this.http);
    this.finance = new FinanceModule(this.http);
    this.departments = new DepartmentsModule(this.http);
    this.staff = new StaffModule(this.http);
    this.branches = new BranchesModule(this.http);
    this.inventory = new InventoryModule(this.http);
    this.suppliers = new SuppliersModule(this.http);
    this.delivery = new DeliveryModule(this.http);
    this.services = new ServicesModule(this.http);
    this.insurance = new InsuranceModule(this.http);
    this.education = new EducationModule(this.http);
  }

  public setTenantId(tenantId: string): void {
    this.http.setTenantId(tenantId);
  }

  public setBusinessSlug(slug: string): void {
    this.http.setBusinessSlug(slug);
  }

  public setApiKey(apiKey?: string | null): void {
    this.http.setApiKey(apiKey);
  }

  public get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.http.get<T>(path, options);
  }

  public post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.http.post<T>(path, body, options);
  }

  public put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.http.put<T>(path, body, options);
  }

  public patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.http.patch<T>(path, body, options);
  }

  public delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.http.delete<T>(path, options);
  }
}

export function createTracklrClient(config: TracklrClientConfig = {}): TracklrClient {
  return new TracklrClient(config);
}

export default TracklrClient;
