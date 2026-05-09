"use client";

import { useState, useCallback } from "react";
import { jobsApi } from "../services";
import type { JobApplication } from "../types";

export const useTechnicianApplications = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const fetchMyApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobsApi.getMyApplications();
      setApplications(res.data.data);
      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch your applications");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateApplication = async (id: string, data: { message?: string; proposed_price?: number }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobsApi.updateApplication(id, data);
      setApplications(prev => prev.map(app => app.id.toString() === id ? res.data.data : app));
      return { success: true, data: res.data.data };
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || "Failed to update application";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await jobsApi.withdrawApplication(id);
      setApplications(prev => prev.filter(app => app.id.toString() !== id));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to withdraw application");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    applications,
    loading,
    error,
    fetchMyApplications,
    updateApplication,
    withdrawApplication
  };
};
