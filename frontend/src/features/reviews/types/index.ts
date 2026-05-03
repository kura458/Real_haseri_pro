export type Review = {
  id: number;
  job_id: number;
  rating: number;
  comment: string | null;
  reviewer: {
    id: number;
    name: string;
    avatar: string | null;
  };
  reviewed_user: {
    id: number;
    name: string;
  };
  created_at: string;
};

export type CreateReviewInput = {
  job_id: number;
  reviewed_user_id: number;
  rating: number;
  comment?: string;
};