export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GOOGLE: "/auth/google",
    GOOGLE_ROLE: "/auth/google/role",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    ADMIN: {
      LOGIN: "/admin/login",
      VERIFY_OTP: "/admin/verify-otp",
      LOGOUT: "/admin/logout",
    },
  },
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
  },
  PROVIDERS: {
    BASE: "/providers",
  },
  JOBS: {
    BASE: "/jobs",
  },
  BOOKINGS: {
    BASE: "/bookings",
  },
} as const;