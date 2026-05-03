"use client";

import { useState } from "react";
import { jobsApi } from "../services";

export const useJobApplications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = async (jobId: string, data?: { message?: string; proposed_price?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobsApi.apply(jobId, data);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to apply";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const accept = async (id: string) => {
    await jobsApi.acceptApplication(id);
  };

  const reject = async (id: string) => {
    await jobsApi.rejectApplication(id);
  };

  return { apply, accept, reject, loading, error };
};