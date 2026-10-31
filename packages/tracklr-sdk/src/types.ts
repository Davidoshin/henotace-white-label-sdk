/**
 * Core type definitions for Tracklr Business SDK
 */

export type BusinessCategory = 'retail' | 'production' | 'service' | 'lounge' | 'insurance' | string;
export type ProductOperatingMode = 'standard' | 'production' | 'lounge';

export interface StorageAdapter {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

export interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
  timeout?: number;
}

export interface TracklrClientConfig {
  baseUrl?: string;
  tenantId?: string;
  businessSlug?: string;
  apiKey?: string;
  clientPlatform?: 'web' | 'mobile' | 'desktop';
  storage?: StorageAdapter;
  storageAdapter?: StorageAdapter;
  onUnauthorized?: () => void;
  onTokenRefreshed?: (newToken: string) => void;
  onError?: (endpoint: string, method: string, status: number, message: string, extra?: Record<string, unknown>) => void;
}

export interface ZReportResponse {
  business_name?: string;
  branch_name?: string;
  generated_at?: string;
  total_cash_sales?: number;
  total_pos_sales?: number;
  total_transfer_sales?: number;
  total_sales_amount?: number;
  sales_count?: number;
  [key: string]: unknown;
}

export interface User {
  id: number | string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
  phone_number?: string;
  is_active?: boolean;
  [key: string]: unknown;
}

export interface Business {
  id: number | string;
  name: string;
  code?: string;
  slug?: string;
  business_category: BusinessCategory;
  business_type?: string;
  product_operating_mode?: ProductOperatingMode;
  currency?: string;
  email?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  [key: string]: unknown;
}

export interface AuthTokens {
  access: string;
  refresh?: string;
}

export interface AuthResponse {
  tokens?: AuthTokens;
  token?: string;
  refresh?: string;
  user: User;
  business: Business | null;
  login_as?: string;
  [key: string]: unknown;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
  isNetworkError?: boolean;
}

export interface RetailProduct {
  id: number | string;
  name: string;
  sku?: string;
  barcode?: string;
  selling_price: number;
  cost_price?: number;
  stock_quantity: number;
  reorder_level?: number;
  category?: string;
  unit_of_measure?: string;
  is_active?: boolean;
  image_url?: string;
  [key: string]: unknown;
}

export interface SaleItem {
  product_id: number | string;
  product_name: string;
  quantity: number;
  unit_price: number;
  discount?: number;
  total: number;
}

export interface CreateSalePayload {
  items: SaleItem[];
  customer_id?: number | string;
  payment_method: 'cash' | 'card' | 'transfer' | 'pos' | 'split';
  amount_paid: number;
  notes?: string;
  [key: string]: unknown;
}

export interface ProductionBatch {
  id: number | string;
  batch_number: string;
  recipe_id?: number | string;
  recipe_name?: string;
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled' | 'quality_check';
  target_quantity: number;
  produced_quantity?: number;
  start_date?: string;
  end_date?: string;
  cost_per_unit?: number;
  total_cost?: number;
  notes?: string;
  [key: string]: unknown;
}

export interface RecipeIngredient {
  raw_material_id: number | string;
  raw_material_name: string;
  quantity: number;
  unit_of_measure: string;
  cost_per_unit?: number;
}

export interface ProductionRecipe {
  id: number | string;
  name: string;
  description?: string;
  output_product_id?: number | string;
  output_quantity: number;
  unit_of_measure: string;
  ingredients: RecipeIngredient[];
  total_estimated_cost?: number;
  [key: string]: unknown;
}

export interface RawMaterial {
  id: number | string;
  name: string;
  code?: string;
  unit_of_measure: string;
  current_stock: number;
  reorder_level?: number;
  cost_per_unit: number;
  supplier_name?: string;
  [key: string]: unknown;
}

export interface WasteRecord {
  id: number | string;
  batch_id?: number | string;
  item_type: 'raw_material' | 'finished_goods' | 'in_process';
  item_id: number | string;
  item_name: string;
  quantity_lost: number;
  unit_of_measure: string;
  reason: string;
  cost_impact?: number;
  date_recorded: string;
  [key: string]: unknown;
}
