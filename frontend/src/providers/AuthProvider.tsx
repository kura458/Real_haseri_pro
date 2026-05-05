"use client";

import { type ReactNode, useEffect, useState } from "react";
import { clientApi, getAccessToken, setAccessToken } from "../lib/api/client";
import { API_ROUTES } from "../constants/api-routes";
import { useAuthStore } from "../stores/authStore";
import { adminAuthApi } from "../features/auth/admin/services/admin-auth.api";

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
        try {
          const adminRes = await adminAuthApi.refresh();
          const adminData = adminRes.data?.data?.admin;
          const adminToken = adminRes.data?.data?.access_token;
          if (adminToken) setAccessToken(adminToken);
          if (adminData) {
            setAdmin(adminData);
            return;
          }
        } catch {
          // Ignore admin refresh errors and attempt user refresh
        }

        if (!getAccessToken()) {
          try {
            const refreshRes = await clientApi.post(API_ROUTES.AUTH.REFRESH);
            const token =
              refreshRes.data?.data?.access_token ||
              refreshRes.data?.data?.token ||
              refreshRes.data?.data?.tokens?.access_token ||
              null;
            if (token) setAccessToken(token);
            const refreshedUser = refreshRes.data?.data?.user || null;
            if (refreshedUser) {
              setUser(refreshedUser);
              return;
            }
          } catch {
            // Ignore refresh errors and attempt profile fetches
          }
        }

        try {
          const { data } = await clientApi.get(API_ROUTES.CUSTOMER.PROFILE, {
            headers: { "X-Skip-Auth-Refresh": "1" },
          });
          setUser(data.data);
          return;
        } catch {
          // Try technician next
        }

        try {
          const { data } = await clientApi.get(API_ROUTES.TECHNICIAN.PROFILE, {
            headers: { "X-Skip-Auth-Refresh": "1" },
          });
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