"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userAuthApi } from "../services";
import { useAuth } from "@/src/hooks/useAuth";
import type { RegisterInput } from "../types";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const router = useRouter();

  const register = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await userAuthApi.register(data);
      setUser(res.data.data.user);
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};