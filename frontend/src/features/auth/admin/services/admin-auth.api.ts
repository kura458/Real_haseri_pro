import { clientApi } from "@/src/lib/api/client";
import type { AdminLoginInput, AdminOtpInput } from "../types";

export const adminAuthApi = {
  login: (data: AdminLoginInput) => clientApi.post("/admin/login", data),

  verifyOtp: (data: AdminOtpInput) => clientApi.post("/admin/verify-otp", data),

  logout: () => clientApi.post("/admin/logout"),
};