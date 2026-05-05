// Task: HAS-30 - User Login API with Validation
import { clientApi } from "@/src/lib/api/client";
import type { LoginInput, RegisterInput, ForgotPasswordInput, ResetPasswordInput } from "../types";

export const userAuthApi = {
  register: (data: RegisterInput) => clientApi.post("/auth/register", data),
  login: (data: LoginInput) => clientApi.post("/auth/login", data),
  logout: () => clientApi.post("/auth/logout"),
  forgotPassword: (data: ForgotPasswordInput) => clientApi.post("/auth/forgot-password", data),
  resetPassword: (data: ResetPasswordInput) => clientApi.post("/auth/reset-password", data),
  google: (data: { id_token: string }) => clientApi.post("/auth/google", data),
  googleRole: (data: { user_id: string; role: string }) => clientApi.post("/auth/google/role", data),
};