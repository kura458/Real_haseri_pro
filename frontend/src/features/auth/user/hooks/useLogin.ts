"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userAuthApi } from "../services";
import { useAuth } from "@/src/hooks/useAuth";
import type { LoginInput } from "../types";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const router = useRouter();

  const login = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userAuthApi.login(data);
      setUser(res.data.data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};