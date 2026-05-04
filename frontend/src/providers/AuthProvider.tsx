"use client";

import { type ReactNode, useEffect, useState } from "react";
import { clientApi } from "../lib/api/client";
import { API_ROUTES } from "../constants/api-routes";
import { useAuthStore } from "../stores/authStore";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, admin, setUser, setAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }

    if (admin) setAdmin(null);

    const checkAuth = async () => {
      try {
        try {
          await clientApi.post(API_ROUTES.AUTH.REFRESH);
        } catch {
          // Ignore refresh errors and attempt profile fetches
        }

        try {
          const { data } = await clientApi.get(API_ROUTES.CUSTOMER.PROFILE);
          setUser(data.data);
          return;
        } catch {
          // Try technician next
        }

        try {
          const { data } = await clientApi.get(API_ROUTES.TECHNICIAN.PROFILE);
          setUser(data.data);
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