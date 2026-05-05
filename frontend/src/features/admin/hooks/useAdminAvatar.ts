"use client";

import { useAuth } from "@/src/hooks/useAuth";
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

  return {
    admin,
    fullName,
    email,
    avatarSrc,
    initials,
    logout: adminLogout,
  };
}
