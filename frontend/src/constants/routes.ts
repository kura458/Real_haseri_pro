export const APP_ROUTES = {
  ROOT: "/",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    ADMIN: {
      LOGIN: "/admin/login",
      VERIFY_OTP: "/admin/verify-otp",
    },
  },
  DASHBOARD: {
    HOME: "/dashboard",
    JOBS: {
      BASE: "/jobs",
      POST: "/jobs/post",
      DETAIL: (id: string) => `/jobs/${id}`,
    },
    APPLICATIONS: {
      BASE: "/applications",
      DETAIL: (id: string) => `/applications/${id}`,
    },
    CHAT: {
      BASE: "/chat",
      ROOM: (id: string) => `/chat/${id}`,
    },
    NOTIFICATIONS: "/notifications",
    SETTINGS: {
      PROFILE: "/settings/profile",
      SECURITY: "/settings/security",
      PAYMENT_METHODS: "/settings/payment-methods",
    },
    ADMIN: {
      DASHBOARD: "/admin/dashboard",
      USERS: "/admin/users",
      VERIFICATIONS: "/admin/verifications",
      CATEGORIES: "/admin/categories",
      REPORTS: "/admin/reports",
      SETTINGS: "/admin/settings",
    },
  },
  PUBLIC: {
    HOME: "/",
    PROVIDERS: "/providers",
    PROVIDER_DETAIL: (id: string) => `/providers/${id}`,
  },
} as const;