"use client";

import { useState } from "react";
import { paymentsApi } from "../services";
import type { PaymentResponse } from "../types";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateVerification = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await paymentsApi.initiateCustomerVerification();
      const data: PaymentResponse = res.data.data;
      window.location.href = data.checkout_url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { initiateVerification, loading, error };
};