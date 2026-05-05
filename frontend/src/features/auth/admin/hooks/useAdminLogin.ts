// Task: HAS-31 - Session Management & Access Control
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAuthApi } from "../services/admin-auth.api";

export const useAdminLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminAuthApi.login(data);
      const adminId = res.data.data.admin_id;
      router.push(`/admin/verify-otp?admin_id=${adminId}`);
    } catch (err: any) {
      const message = err?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};