"use client";

import { useState, useEffect } from "react";
import { publicApi } from "../services";
import type { PublicTechnician } from "../types";

export const useTopTechnicians = () => {
  const [technicians, setTechnicians] = useState<PublicTechnician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getTopTechnicians();
        if (!ignore) setTechnicians(res.data.data);
      } catch {
        //
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetch();
    return () => { ignore = true; };
  }, []);

  return { technicians, loading };
};