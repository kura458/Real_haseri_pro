import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";
import type { CustomerVerificationStatus, CustomerVerificationResponse } from "../types";

export const customersApi = {
  getVerificationStatus: () =>
    clientApi.get<{ success: boolean; data: CustomerVerificationStatus }>(
      API_ROUTES.CUSTOMER.VERIFICATION_STATUS
    ),

  initiateVerification: () =>
    clientApi.post<{ success: boolean; data: CustomerVerificationResponse }>(
      API_ROUTES.CUSTOMER.VERIFY
    ),

  confirmVerification: () =>
    clientApi.post<{ success: boolean; data: { verified: boolean } }>(
      API_ROUTES.CUSTOMER.VERIFY_CONFIRM
    ),

  getProfile: () =>
    clientApi.get(API_ROUTES.CUSTOMER.PROFILE),

  updateProfile: (data: Record<string, unknown>) =>
    clientApi.put(API_ROUTES.CUSTOMER.PROFILE, data),

  updateAvatar: (formData: FormData) =>
    clientApi.post(API_ROUTES.CUSTOMER.AVATAR, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateCover: (formData: FormData) =>
    clientApi.post(API_ROUTES.CUSTOMER.COVER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteAccount: () =>
    clientApi.delete(API_ROUTES.CUSTOMER.PROFILE),
};