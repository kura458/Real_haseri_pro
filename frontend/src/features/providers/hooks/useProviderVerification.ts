"use client";

import { useState } from "react";
import { providersApi } from "../services";

export const useProviderVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await providersApi.submitVerification(formData);
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const res = await providersApi.getVerificationStatus();
      return res.data.data;
    } catch {
      return null;
    }
  };

  return { submit, checkStatus, loading, error };
};