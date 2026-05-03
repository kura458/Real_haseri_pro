"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { userAuthApi } from "@/src/features/auth/user/services";
import type { UserRole } from "@/src/features/auth/user/types";

export const useGoogleRoleSelection = (storageKey = "haseri:register:google") => {
  const [googleUserId, setGoogleUserId] = useState<string | null>(null);
  const [googleRoleError, setGoogleRoleError] = useState<string | null>(null);
  const [googleRoleLoading, setGoogleRoleLoading] = useState(false);
  const [googleStorageChecked, setGoogleStorageChecked] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedGoogle = sessionStorage.getItem(storageKey);
    if (storedGoogle) {
      setGoogleUserId(storedGoogle);
    }
    setGoogleStorageChecked(true);
  }, [storageKey]);

  const assignGoogleRole = useCallback(
    async (role: UserRole) => {
      if (!googleUserId) return false;
      setGoogleRoleLoading(true);
      setGoogleRoleError(null);

      try {
        const res = await userAuthApi.googleRole({ user_id: googleUserId, role });
        if (!res.data?.data?.user) {
          console.error("Google role response missing user data:", res.data);
          throw new Error("Failed to receive user data after setting role");
        }
        setUser(res.data.data.user as any);
        sessionStorage.removeItem(storageKey);
        router.push("/dashboard");
      } catch (err: any) {
        setGoogleRoleError(err?.message || "Google sign-in failed. Please try again.");
      } finally {
        setGoogleRoleLoading(false);
      }

      return true;
    },
    [googleUserId, router, setUser, storageKey]
  );

  return {
    googleUserId,
    googleRoleError,
    googleRoleLoading,
    googleStorageChecked,
    assignGoogleRole,
  };
};
