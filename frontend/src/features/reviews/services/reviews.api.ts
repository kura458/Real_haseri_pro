import { clientApi } from "@/src/lib/api/client";
import { API_ROUTES } from "@/src/constants/api-routes";
import type { CreateReviewInput } from "../types";

export const reviewsApi = {
  create: (data: CreateReviewInput) =>
    clientApi.post(API_ROUTES.REVIEWS.BASE, data),

  getByUser: (userId: string) =>
    clientApi.get(API_ROUTES.REVIEWS.USER(userId)),

  getByJob: (jobId: string) =>
    clientApi.get(API_ROUTES.REVIEWS.JOB(jobId)),
};