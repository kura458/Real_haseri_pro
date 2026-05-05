import { clientApi } from "@/src/lib/api/client";
import { AdminLoginResponse, AdminVerifyOtpResponse, AdminRefreshResponse } from "../types/admin-auth.types";

export const adminAuthApi = {
  login: (data: { email: string; password: string }) =>
    clientApi.post<AdminLoginResponse>("/admin/login", data),
    
  verifyOtp: (data: { admin_id: number; code: string }) => 
    clientApi.post<AdminVerifyOtpResponse>("/admin/verify-otp", data),

  refresh: () => clientApi.post<AdminRefreshResponse>("/admin/refresh"),
    
  logout: () => clientApi.post("/admin/logout"),
};