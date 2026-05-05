"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { adminAuthApi } from "@/src/features/auth/admin/services/admin-auth.api";
import { setAccessToken } from "@/src/lib/api/client";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";

export function useAdminAvatar() {
  const { admin, adminLogout } = useAuth();

  if (!admin) {
    return {
      admin: null,
      fullName: "",
      email: "",
      avatarSrc: null,
      initials: "A",
      logout: () => {},
    };
  }

  const fullName = admin.name || "Administrator";
  const email = admin.email || "";
  const avatarSrc = resolveAssetUrl(admin.avatar);
  const initials = (fullName || "A")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const logout = async () => {
    try {
      await adminAuthApi.logout();
    } catch {
      // Ignore logout errors and clear local state anyway.
    } finally {
      setAccessToken(null);
      adminLogout();
    }
  };

  return {
    admin,
    fullName,
    email,
    avatarSrc,
    initials,
    logout,
  };
}
