import { HttpClient } from './client.js';
import { AuthResponse, User, Business } from './types.js';

export class AuthModule {
  constructor(private http: HttpClient) {}

  public async login(credentials: { email?: string; username?: string; password: string; [key: string]: unknown }): Promise<AuthResponse> {
    const payload = {
      username: credentials.email || credentials.username,
      email: credentials.email,
      password: credentials.password,
    };

    const res = await this.http.request<AuthResponse>('auth/login/', {
      method: 'POST',
      body: JSON.stringify(payload),
      requiresAuth: false,
    });

    const access = res.tokens?.access || res.token;
    const refresh = res.tokens?.refresh || res.refresh;

    if (access) {
      await this.http.setAccessToken(access);
    }
    if (refresh) {
      await this.http.setRefreshToken(refresh);
    }

    return res;
  }

  public async register(data: Record<string, unknown>): Promise<AuthResponse> {
    return await this.http.request<AuthResponse>('auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth: false,
    });
  }

  public async verifySession(): Promise<{ valid: boolean; user?: User; business?: Business }> {
    try {
      const res = await this.http.request<{ user: User; business: Business }>('auth/me/', {
        method: 'GET',
      });
      return { valid: true, user: res.user, business: res.business };
    } catch {
      return { valid: false };
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.http.request('auth/cookie/logout/', {
        method: 'POST',
        requiresAuth: false,
      });
    } catch {
      // Ignore network errors during logout
    }
    await this.http.clearTokens();
  }

  public async getProfile(): Promise<any> {
    try {
      return await this.http.get<any>('user/profile/');
    } catch {
      return await this.http.get<any>('profile/');
    }
  }

  public async verify2FA(payload: { email: string; code: string; realm?: string }): Promise<any> {
    return await this.http.post<any>('auth/2fa/verify-login-session/', payload, {
      requiresAuth: false,
    });
  }

  public async loginCustomer(data: Record<string, unknown>): Promise<any> {
    try {
      return await this.http.post<any>('auth/customer/login/', data, { requiresAuth: false });
    } catch {
      return await this.http.post<any>('customer/login/', data, { requiresAuth: false });
    }
  }

  public async loginBusiness(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/login/', { ...data, login_as: 'admin' }, { requiresAuth: false });
  }

  public async loginSecurity(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('security-login/', data, { requiresAuth: false });
  }

  public async loginBrm(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('brm/login/', data, { requiresAuth: false });
  }

  public async initSignup(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('auth/signup/init/', data, { requiresAuth: false });
  }

  public async setPassword(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('auth/signup/set-password/', data, { requiresAuth: false });
  }

  public async changePassword(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('change-password/', data);
  }

  public async deactivateAccount(): Promise<any> {
    return await this.http.post<any>('account/deactivate/', {});
  }

  public async getStudentMe(): Promise<any> {
    return await this.http.get<any>('cbt/student/me/');
  }

  public async requestPasswordReset(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('auth/password/reset-request/', payload, { requiresAuth: false });
  }

  public async sendOtpPasswordReset(payload: { email: string }): Promise<any> {
    return await this.http.post<any>('otp/send-password-reset/', payload, { requiresAuth: false });
  }

  public async verifyOtpPasswordReset(payload: { email: string; otp: string; new_password: string }): Promise<any> {
    return await this.http.post<any>('otp/verify-password-reset/', payload, { requiresAuth: false });
  }

  public async get2FAStatus(): Promise<any> {
    return await this.http.get<any>('auth/2fa/status/');
  }

  public async setup2FA(payload: Record<string, unknown> = {}): Promise<any> {
    return await this.http.post<any>('auth/2fa/setup/', payload);
  }

  public async verify2FASetup(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('auth/2fa/verify-setup/', payload);
  }

  public async disable2FA(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('auth/2fa/disable/', payload);
  }

  public async regenerate2FABackupCodes(payload: Record<string, unknown> = {}): Promise<any> {
    return await this.http.post<any>('auth/2fa/regenerate-backup-codes/', payload);
  }

  public async getTelegramStatus(): Promise<any> {
    return await this.http.get<any>('telegram/status/');
  }

  public async verifyTelegram(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('telegram/verify/', payload);
  }

  public async unlinkTelegram(): Promise<any> {
    return await this.http.post<any>('telegram/unlink/', {});
  }

  public async loginAuthBusiness(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('auth/business/login/', data, { requiresAuth: false });
  }

  public async loginCustomerPublic(data: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('public/customer/login/', data, { requiresAuth: false });
  }

  public async loginWithOtp(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('otp/login-with-otp/', payload, { requiresAuth: false });
  }

  public async resendOtp(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('otp/resend/', payload, { requiresAuth: false });
  }

  public async loginProductionVendor(payload: Record<string, unknown>): Promise<any> {
    return await this.http.post<any>('business/production/vendor-auth/login/', payload, { requiresAuth: false });
  }
}

