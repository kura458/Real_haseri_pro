"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

const ACCESS_TOKEN_KEY = "haseri_access_token";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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

      logout: () => {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        }

        set({
          user: null,
          admin: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      adminLogout: () => {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        }

        set({
          user: null,
          admin: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },
    }),
    {
      name: "haseri-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);