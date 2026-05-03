export type JobCategory = {
  id: number;
  name: string;
  description: string | null;
};

export type Job = {
  id: number;
  title: string;
  description: string;
  price: number;
  commission: number;
  status: "open" | "assigned" | "in_progress" | "completed" | "cancelled";
  category: string | null;
  customer: {
    id: number;
    name: string;
  } | null;
  technician: {
    id: number;
    name: string;
  } | null;
  address: {
    city: string;
    sub_city: string | null;
    specific_location: string | null;
  } | null;
  created_at: string;
};

export type CreateJobInput = {
  title: string;
  description?: string;
  category_id: number;
  price: number;
  city?: string;
  sub_city?: string;
  specific_location?: string;
};

export type JobApplication = {
  id: number;
  job_id: number;
  message: string | null;
  proposed_price: number | null;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  provider: {
    id: number;
    name: string;
    avatar: string | null;
  } | null;
  created_at: string;
};

export type JobFilters = {
  category_id?: number;
  city?: string;
  search?: string;
  sort?: "newest" | "oldest" | "price_high" | "price_low";
};