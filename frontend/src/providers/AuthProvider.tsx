"use client";

import { type ReactNode, useEffect, useState } from "react";
import { clientApi } from "../lib/api/client";
import { useAuthStore } from "../stores/authStore";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, admin, setUser, setAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user || admin) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        // Try user first
        const { data } = await clientApi.get("/auth/me");
        setUser(data.data);
      } catch {
        try {
          // Try admin
          const { data } = await clientApi.get("/admin/me");
          setAdmin(data.data);
        } catch {
          // Not logged in
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user, admin, setUser, setAdmin]);

  if (loading) return null;

  return <>{children}</>;
};