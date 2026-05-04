"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userAuthApi } from "../services";
import { useAuth } from "@/src/hooks/useAuth";
import type { LoginInput } from "../types";
import { clientApi, setAccessToken } from "@/src/lib/api/client";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const router = useRouter();
  const resolveUser = (payload: any) => payload?.data?.user ?? payload?.user ?? payload?.data ?? null;

  const login = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userAuthApi.login(data);
      const userData = resolveUser(res.data);

      const token =
        res.data?.data?.access_token ||
        res.data?.data?.token ||
        res.data?.data?.tokens?.access_token ||
        res.data?.access_token ||
        res.data?.token ||
        null;

      if (token) setAccessToken(token);

      if (userData) {
        setUser(userData);
      } else {
        const profileRes = await clientApi.get("/auth/me");
        const refreshed = resolveUser(profileRes.data);
        if (refreshed) setUser(refreshed);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};