"use client";

import { useCallback, useState } from "react";
import { adminApi } from "../services";
import type { AdminUser } from "../types";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async (params?: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers(params);
      setUsers(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, []);

  const deactivate = useCallback(async (id: string) => {
    await adminApi.deactivateUser(id);
    fetchAll();
  }, [fetchAll]);

  const activate = useCallback(async (id: string) => {
    await adminApi.activateUser(id);
    fetchAll();
  }, [fetchAll]);

  const remove = useCallback(async (id: string) => {
    await adminApi.deleteUser(id);
    fetchAll();
  }, [fetchAll]);

  return { users, loading, fetchAll, deactivate, activate, remove };
};