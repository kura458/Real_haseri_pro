"use client";

import { useState } from "react";
import { adminAuthApi } from "../services";
import type { AdminLoginInput } from "../types";

export const useAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: AdminLoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminAuthApi.login(data);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};