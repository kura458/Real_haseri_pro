"use client";

import { useState, useCallback } from "react";
import { reviewsApi } from "../services";
import type { Review } from "../types";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const getByUser = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const res = await reviewsApi.getByUser(userId);
      setReviews(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  const getByJob = useCallback(async (jobId: string) => {
    setLoading(true);
    try {
      const res = await reviewsApi.getByJob(jobId);
      setReviews(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  return { reviews, loading, getByUser, getByJob };
};