"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { env } from "@/src/config/env";
import { userAuthApi } from "@/src/features/auth/user/services";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { clientApi, setAccessToken } from "@/src/lib/api/client";

declare global {
  interface Window {
    google?: any;
    __googleInit?: boolean;
  }
}

type GoogleRegisterOptions = {
  onNewUser?: (userId?: string) => void;
  onExistingUser?: (user: any) => void;
  onError?: (message: string) => void;
  buttonText?: "signin_with" | "signup_with";
  buttonTheme?: "outline" | "filled_blue" | "filled_black";
  buttonSize?: "large" | "medium" | "small";
  buttonShape?: "rectangular" | "pill";
};

export const useGoogleRegister = (options: GoogleRegisterOptions = {}) => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const buttonId = useId();
  const resolveUser = (payload: any) => payload?.data?.user ?? payload?.user ?? payload?.data ?? null;
  const resolveToken = (payload: any) =>
    payload?.data?.access_token ||
    payload?.data?.token ||
    payload?.data?.tokens?.access_token ||
    payload?.access_token ||
    payload?.token ||
    null;

  const handleResponse = async (response: { credential?: string }) => {
    if (!response?.credential) {
      return;
    }
    try {
      setGoogleLoading(true);
      setGoogleError(null);
      const res = await userAuthApi.google({ id_token: response.credential });
      const payload = res.data?.data ?? res.data;
      const token = resolveToken(res.data);
      if (token) setAccessToken(token);

      if (payload?.new_user) {
        const newUserId = payload?.user_id ?? payload?.user?.id;
        if (options.onNewUser) {
          options.onNewUser(newUserId);
          return;
        }
        router.push("/register/role");
        return;
      }
      const user = resolveUser(res.data);
      if (!user) {
        const profileRes = await clientApi.get("/auth/me");
        const refreshed = resolveUser(profileRes.data);
        if (!refreshed) throw new Error("Authentication failed");
        if (options.onExistingUser) {
          options.onExistingUser(refreshed);
          return;
        }
        setUser(refreshed);
        router.push(refreshed.role === "admin" ? "/admin/dashboard" : "/dashboard");
        return;
      }
      if (options.onExistingUser) {
        options.onExistingUser(user);
        return;
      }
      setUser(user);
      router.push(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      return;
    } catch (err: any) {
      const message = err?.message || "Authentication failed";
      setGoogleError(message);
      options.onError?.(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const renderGoogleButton = useCallback(() => {
    if (!window.google?.accounts?.id) return;
    const container = document.getElementById(buttonId) as HTMLDivElement | null;
    if (!container) return;
    container.innerHTML = "";
    window.google.accounts.id.renderButton(container, {
      theme: options.buttonTheme ?? "outline",
      size: options.buttonSize ?? "large",
      shape: options.buttonShape ?? "rectangular",
      text: options.buttonText ?? "signin_with",
      logo_alignment: "left",
      width: container.offsetWidth || 360,
    });
  }, [buttonId, options.buttonShape, options.buttonSize, options.buttonText, options.buttonTheme]);

  useEffect(() => {
    if (!env.GOOGLE_CLIENT_ID || typeof window === "undefined") return;
    const loadGoogleScript = () =>
      new Promise<void>((resolve) => {
        if (document.querySelector("script[data-google-identity]")) return resolve();
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.dataset.googleIdentity = "true";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    const init = async () => {
      try {
        await loadGoogleScript();
        if (!window.google?.accounts?.id) return;
        
        if (!window.__googleInit) {
          window.google.accounts.id.initialize({
            client_id: env.GOOGLE_CLIENT_ID,
            callback: handleResponse,
          });
          window.__googleInit = true;
        }
        setGoogleReady(true);
      } catch (err) {
        console.error("Google SDK Initialization failed", err);
      }
    };
    init();
  }, []);
  useEffect(() => {
    if (!googleReady) return;
    renderGoogleButton();
  }, [googleReady, renderGoogleButton]);

  return { googleLoading, googleReady, googleError, googleButtonId: buttonId };
};
