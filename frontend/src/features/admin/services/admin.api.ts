import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";
import type {
  AdminStats,
  AdminUser,
  PendingVerification,
  FeeSettings,
  AdminAnalytics,
} from "../types";

export const adminApi = {
  // Dashboard
  getStats: () =>
    clientApi.get<{ success: boolean; data: AdminStats }>(API_ROUTES.ADMIN.DASHBOARD),

  getAnalytics: () =>
    clientApi.get<{ success: boolean; data: AdminAnalytics }>(API_ROUTES.ADMIN.ANALYTICS),

  // Users
  getUsers: (params?: Record<string, string>) =>
    clientApi.get<{ success: boolean; data: AdminUser[] }>(API_ROUTES.ADMIN.USERS, { params }),

  getUser: (id: string) =>
    clientApi.get<{ success: boolean; data: AdminUser }>(API_ROUTES.ADMIN.USER_DETAIL(id)),

  deactivateUser: (id: string) =>
    clientApi.put(API_ROUTES.ADMIN.USER_DEACTIVATE(id)),

  activateUser: (id: string) =>
    clientApi.put(API_ROUTES.ADMIN.USER_ACTIVATE(id)),

  deleteUser: (id: string) =>
    clientApi.delete(API_ROUTES.ADMIN.USER_DETAIL(id)),

  // Verifications
  getPendingVerifications: () =>
    clientApi.get<{ success: boolean; data: PendingVerification[] }>(
      API_ROUTES.ADMIN.VERIFICATIONS_PENDING
    ),

  approveVerification: (verificationId: number) =>
    clientApi.post(API_ROUTES.ADMIN.VERIFICATIONS_APPROVE, { verification_id: verificationId }),

  rejectVerification: (verificationId: number, reason: string) =>
    clientApi.post(API_ROUTES.ADMIN.VERIFICATIONS_REJECT, {
      verification_id: verificationId,
      reason,
    }),

  // Settings
  getFees: () =>
    clientApi.get<{ success: boolean; data: FeeSettings }>(API_ROUTES.ADMIN.SETTINGS_FEES),

  updateFees: (data: FeeSettings) =>
    clientApi.put(API_ROUTES.ADMIN.SETTINGS_FEES, data),
};