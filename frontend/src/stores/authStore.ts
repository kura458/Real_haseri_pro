"use client";

import { create } from "zustand";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: "customer" | "provider";
  avatar?: string;
}

interface Admin {
  id: number;
  name: string;
  email: string;
}

type AuthState = {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  setAdmin: (admin: Admin | null) => void;
  logout: () => void;
  adminLogout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  admin: null,
  isAuthenticated: false,
  isAdmin: false,

  setUser: (user) =>
    set({
      user,
      admin: null,
      isAuthenticated: !!user,
      isAdmin: false,
    }),

  setAdmin: (admin) =>
    set({
      admin,
      user: null,
      isAuthenticated: !!admin,
      isAdmin: true,
    }),

  logout: () =>
    set({
      user: null,
      admin: null,
      isAuthenticated: false,
      isAdmin: false,
    }),

  adminLogout: () =>
    set({
      user: null,
      admin: null,
      isAuthenticated: false,
      isAdmin: false,
    }),
}));