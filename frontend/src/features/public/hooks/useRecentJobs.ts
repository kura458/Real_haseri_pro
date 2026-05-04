"use client";

import { useEffect, useState } from "react";
import { publicApi } from "../services";
import type { PublicJob } from "../types";

export const useRecentJobs = () => {
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getRecentJobs();
        if (!ignore) setJobs(res.data.data);
      } catch {
        if (!ignore) setJobs([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetch();
    return () => {
      ignore = true;
    };
  }, []);

  return { jobs, loading };
};
