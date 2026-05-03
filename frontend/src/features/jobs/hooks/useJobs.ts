"use client";

import { useState, useCallback } from "react";
import { jobsApi } from "../services";
import type { Job, JobFilters } from "../types";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const getJobs = useCallback(async (filters?: JobFilters) => {
    setLoading(true);
    try {
      const res = await jobsApi.getAll(filters);
      setJobs(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, loading, getJobs };
};