"use client";

import { useState } from "react";
import { customersApi } from "../services";

export const useCustomerVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await customersApi.initiateVerification();
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Verification failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const confirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await customersApi.confirmVerification();
      return res.data.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Confirmation failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const res = await customersApi.getVerificationStatus();
      return res.data.data;
    } catch {
      return null;
    }
  };

  return { initiate, confirm, checkStatus, loading, error };
};