export interface Admin {
  id: number;
  name: string;
  email: string;
}

export interface AdminLoginResponse {
  message: string;
  admin_id: number;
}

export interface AdminVerifyOtpResponse {
  access_token: string;
  expires_in: number;
  admin: Admin;
}

export interface AdminRefreshResponse {
  access_token: string;
  expires_in: number;
  admin: Admin;
}

export interface AdminOtpInput {
  admin_id: number;
  code: string;
}