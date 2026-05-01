"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userAuthApi } from "../services";
import type { ResetPasswordInput } from "../types";

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const resetPassword = async (data: ResetPasswordInput) => {
    setLoading(true);
    setError(null);
    try {
      await userAuthApi.resetPassword(data);
      router.push("/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Password reset failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error };
};