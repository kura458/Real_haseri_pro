"use client";

import { useState } from "react";
import { reviewsApi } from "../services";
import type { CreateReviewInput } from "../types";

export const useCreateReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateReviewInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reviewsApi.create(data);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Review failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};