// Task: HAS-31 - Session Management & Access Control
import { clientApi } from "@/src/lib/api/client";
import { AdminLoginResponse, AdminVerifyOtpResponse } from "../types/admin-auth.types";

export const adminAuthApi = {
  login: (data: { email: string; password: string }) =>
    clientApi.post<AdminLoginResponse>("/admin/login", data),
    
  verifyOtp: (data: { admin_id: number; code: string }) => 
    clientApi.post<AdminVerifyOtpResponse>("/admin/verify-otp", data),
    
  logout: () => clientApi.post("/admin/logout"),
};