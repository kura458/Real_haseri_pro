"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAuthApi } from "../services";
import { setAccessToken } from "@/src/lib/api/client";
import { useAuth } from "@/src/hooks/useAuth";
import type { AdminOtpInput } from "../types";

export const useAdminVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAdmin } = useAuth();
  const router = useRouter();

  const verifyOtp = async (data: AdminOtpInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminAuthApi.verifyOtp(data);
      const token =
        res.data?.data?.access_token ||
        res.data?.data?.token ||
        res.data?.data?.tokens?.access_token ||
        null;

      if (token) setAccessToken(token);

      setAdmin(res.data.data.admin);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "OTP verification failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading, error };
};