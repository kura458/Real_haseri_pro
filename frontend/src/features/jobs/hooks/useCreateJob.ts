"use client";

import { useState } from "react";
import { jobsApi } from "../services";
import type { CreateJobInput } from "../types";

export const useCreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: CreateJobInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobsApi.create(data);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to post job";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};