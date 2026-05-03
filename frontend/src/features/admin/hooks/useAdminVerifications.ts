"use client";

import { useState } from "react";
import { adminApi } from "../services";
import type { PendingVerification } from "../types";

export const useAdminVerifications = () => {
  const [verifications, setVerifications] = useState<PendingVerification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getPendingVerifications();
      setVerifications(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id: number) => {
    await adminApi.approveVerification(id);
    fetchPending();
  };

  const reject = async (id: number, reason: string) => {
    await adminApi.rejectVerification(id, reason);
    fetchPending();
  };

  return { verifications, loading, fetchPending, approve, reject };
};