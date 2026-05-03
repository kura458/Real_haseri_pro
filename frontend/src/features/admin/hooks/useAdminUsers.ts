"use client";

import { useState } from "react";
import { adminApi } from "../services";
import type { AdminUser } from "../types";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async (params?: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers(params);
      setUsers(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  const deactivate = async (id: string) => {
    await adminApi.deactivateUser(id);
    fetchAll();
  };

  const activate = async (id: string) => {
    await adminApi.activateUser(id);
    fetchAll();
  };

  const remove = async (id: string) => {
    await adminApi.deleteUser(id);
    fetchAll();
  };

  return { users, loading, fetchAll, deactivate, activate, remove };
};