"use client";

import { useState } from "react";
import { userAuthApi } from "../services";
import type { ForgotPasswordInput } from "../types";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const forgotPassword = async (data: ForgotPasswordInput) => {
    setLoading(true);
    setError(null);
    try {
      await userAuthApi.forgotPassword(data);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send reset link";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, success };
};