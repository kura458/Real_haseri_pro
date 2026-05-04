"use client";

import { useEffect, useState, useCallback } from "react";
import { providersApi } from "../services";

const normalizeSkills = (input: unknown): string[] => {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const maybeName = (item as { skill_name?: unknown; name?: unknown }).skill_name ??
          (item as { name?: unknown }).name;
        return typeof maybeName === "string" ? maybeName : null;
      }
      return null;
    })
    .filter((value): value is string => Boolean(value));
};

export const useProviderSkills = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const res = await providersApi.getSkills();
      setSkills(normalizeSkills(res.data?.data));
    } catch {
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setLoading(true);
      try {
        const res = await providersApi.getSkills();
        if (!ignore) setSkills(normalizeSkills(res.data?.data));
      } catch {
        if (!ignore) setSkills([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, []);

  return { skills, loading, refresh: fetchSkills };
};
