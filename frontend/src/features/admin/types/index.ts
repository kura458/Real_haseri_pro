export type AdminStats = {
  users: number;
  technicians: number;
  pending_verifications: number;
  total_jobs: number;
  open_jobs: number;
  completed_jobs: number;
  total_reviews: number;
  revenue: number;
};

export type AdminUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
};

export type PendingVerification = {
  id: number;
  user_id: number;
  national_id_path: string;
  proof_document_path: string | null;
  proof_document_type: string | null;
  status: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  address: {
    city: string;
    sub_city?: string;
    woreda?: string;
    kebele?: string;
    specific_location?: string;
  } | null;
  created_at: string;
};

export type FeeSettings = {
  verification_fee: number;
  job_post_fee: number;
};

export type AdminAnalytics = {
  total_users: number;
  new_users_today: number;
  total_jobs: number;
  jobs_today: number;
  revenue_today: number;
  total_revenue: number;
  pending_verifications: number;
  revenue_history?: { name: string; total: number; trend: number }[];
  user_activity?: { name: string; active: number; new: number }[];
};