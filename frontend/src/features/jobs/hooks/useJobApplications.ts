"use client";

import { useState } from "react";
import { jobsApi } from "../services";
import type { JobApplication } from "../types";

export const useJobApplications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const getApplications = async (jobId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobsApi.getApplications(jobId);
      setApplications(res.data.data);
      return res.data.data;
    } catch (err: unknown) {
      setError("Failed to fetch applications");
      return null;
    } finally {
      setLoading(false);
    }
  };

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
    setLoading(true);
    try {
      await jobsApi.acceptApplication(id);
      setApplications(prev => prev.map(app => app.id.toString() === id ? { ...app, status: 'accepted' } : app));
    } finally {
      setLoading(false);
    }
  };

  const reject = async (id: string) => {
    setLoading(true);
    try {
      await jobsApi.rejectApplication(id);
      setApplications(prev => prev.map(app => app.id.toString() === id ? { ...app, status: 'rejected' } : app));
    } finally {
      setLoading(false);
    }
  };

  return { applications, getApplications, apply, accept, reject, loading, error };
};