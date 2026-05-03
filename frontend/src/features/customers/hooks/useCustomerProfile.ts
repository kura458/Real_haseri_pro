"use client";

import { useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { customersApi } from "../services";

export const useCustomerProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await customersApi.getProfile();
      setUser(res.data.data);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch profile";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const update = async (data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await customersApi.updateProfile(data);
      setUser(res.data.data);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchProfile, update, loading, error };
};