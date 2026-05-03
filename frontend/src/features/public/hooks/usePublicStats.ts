"use client";

import { useState, useEffect } from "react";
import { publicApi } from "../services";
import type { PublicStats } from "../types";

export const usePublicStats = () => {
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      try {
        const res = await publicApi.getStats();
        if (!ignore) setStats(res.data.data);
      } catch {
        //
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetch();
    return () => { ignore = true; };
  }, []);

  return { stats, loading };
};