export type PublicTechnician = {
  id: number;
  name: string;
  avatar: string | null;
  cover: string | null;
  skills: string[];
  rating: number;
  total_reviews: number;
  completed_jobs: number;
  city: string | null;
  verified: boolean;
};

export type PublicJob = {
  id: number;
  title: string;
  price: number;
  category: string | null;
  city: string | null;
  created_at: string;
};

export type PublicStats = {
  technicians: number;
  jobs_posted: number;
  jobs_completed: number;
  reviews: number;
};