"use client";

import { useState, useEffect } from "react";
import { adminApi } from "../services";
import type { AdminStats, AdminAnalytics } from "../types";

export const useAdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [statsRes, analyticsRes] = await Promise.all([
          adminApi.getStats(),
          adminApi.getAnalytics(),
        ]);
        setStats(statsRes.data.data);
        setAnalytics(analyticsRes.data.data);
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { stats, analytics, loading };
};