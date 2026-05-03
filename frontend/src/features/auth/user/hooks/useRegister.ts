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
      if (!res.data?.data?.user) {
        console.error("Registration response missing user data:", res.data);
        throw new Error("Registration succeeded but user data is missing in response");
      }
      setUser(res.data.data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};