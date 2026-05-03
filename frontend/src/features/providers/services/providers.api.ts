import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";

export const providersApi = {
  getProfile: () =>
    clientApi.get(API_ROUTES.TECHNICIAN.PROFILE),

  updateProfile: (data: Record<string, unknown>) =>
    clientApi.put(API_ROUTES.TECHNICIAN.PROFILE, data),

  updateAvatar: (formData: FormData) =>
    clientApi.post(API_ROUTES.TECHNICIAN.AVATAR, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  updateCover: (formData: FormData) =>
    clientApi.post(API_ROUTES.TECHNICIAN.COVER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getSkills: () =>
    clientApi.get(API_ROUTES.TECHNICIAN.SKILLS),

  updateSkills: (skills: string[]) =>
    clientApi.put(API_ROUTES.TECHNICIAN.SKILLS, { skills }),

  submitVerification: (formData: FormData) =>
    clientApi.post(API_ROUTES.TECHNICIAN.VERIFY, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getVerificationStatus: () =>
    clientApi.get(API_ROUTES.TECHNICIAN.VERIFICATION_STATUS),
};