export const APP_CONSTANTS = {
  JOB_STATUS: {
    OPEN: "open",
    ASSIGNED: "assigned",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    CANCELLED: "cancelled",
  },
  APPLICATION_STATUS: {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    WITHDRAWN: "withdrawn",
  },
  PAYMENT_TYPE: {
    JOB_POST: "job_post",
    CUSTOMER_VERIFICATION: "customer_verification",
    COMMISSION: "commission",
  },
  VERIFICATION_STATUS: {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
    VERIFIED: "verified",
  },
  USER_ROLE: {
    CUSTOMER: "customer",
    PROVIDER: "provider",
  },
  DOCUMENT_TYPE: {
    COC: "coc",
    TVET_DIPLOMA: "tvet_diploma",
    LOCAL_PERMIT: "local_permit",
    WORK_EXPERIENCE: "work_experience",
  },
  NOTIFICATION_TYPE: {
    JOB_ASSIGNED: "job_assigned",
    JOB_COMPLETED: "job_completed",
    NEW_APPLICATION: "new_application",
    APPLICATION_ACCEPTED: "application_accepted",
    APPLICATION_REJECTED: "application_rejected",
    REVIEW_RECEIVED: "review_received",
    VERIFICATION_APPROVED: "verification_approved",
    VERIFICATION_REJECTED: "verification_rejected",
  },
  AUTH_COOKIE_NAME: {
    USER_REFRESH: "refresh_token",
    ADMIN_REFRESH: "admin_refresh_token",
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 50,
  },
  FEES: {
    VERIFICATION: 100,
    JOB_POST: 50,
  },
} as const;