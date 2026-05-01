"use client";

import { useAuthStore } from "../stores/authStore";

export const useAuth = () => {
  const { user, admin, isAuthenticated, isAdmin, setUser, setAdmin, logout, adminLogout } =
    useAuthStore();

  return {
    user,
    admin,
    isAuthenticated,
    isAdmin,
    setUser,
    setAdmin,
    logout,
    adminLogout,
  };
};