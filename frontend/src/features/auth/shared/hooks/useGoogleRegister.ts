"use client";

import { useEffect, useState, useMemo } from "react";
import { env } from "@/src/config/env";
import { userAuthApi } from "@/src/features/auth/user/services";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    google?: any;
    __googleInit?: boolean;
  }
}

interface GoogleRegisterOptions {
  buttonText?: "signup_with" | "signin_with" | "continue_with" | "signin";
  onNewUser?: (userId: string) => void;
  onExistingUser?: (user: any) => void;
}

export const useGoogleRegister = (options: GoogleRegisterOptions = {}) => {
  const { setUser } = useAuth();
  const router = useRouter(); // Restore router for default navigation
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  // Generate a stable ID for the button container
  const googleButtonId = useMemo(() => `google-button-${Math.random().toString(36).substr(2, 9)}`, []);

  const handleResponse = async (response: { credential?: string }) => {
    if (!response?.credential) {
      setGoogleLoading(false);
      return;
    }
    try {
      setGoogleLoading(true);
      setGoogleError(null);
      const res = await userAuthApi.google({ id_token: response.credential });
      const payload = res.data.data;

      if (payload?.new_user) {
        if (options.onNewUser) {
          options.onNewUser(payload.user_id || payload.userId);
        } else {
          router.push("/register/role");
        }
        return;
      }

      if (payload?.user) {
        setUser(payload.user);
        if (options.onExistingUser) {
          options.onExistingUser(payload.user);
        } else {
          router.push(payload.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
        }
        return;
      }
    } catch (err: any) {
      setGoogleError(err?.message || "Authentication failed");
    } finally {
      setGoogleLoading(false);
    }
  };

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
            use_fedcm_for_prompt: false,
            auto_select: false,
          });
          window.__googleInit = true;
        }

        // Render the button if the container exists
        const interval = setInterval(() => {
          const btn = document.getElementById(googleButtonId);
          if (btn && window.google?.accounts?.id) {
            window.google.accounts.id.renderButton(btn, {
              theme: "outline",
              base_button: true,
              size: "large",
              text: options.buttonText || "signup_with",
              width: btn.offsetWidth || 400,
            });
            clearInterval(interval);
          }
        }, 100);

        setGoogleReady(true);
        return () => clearInterval(interval);
      } catch (err) {
        console.error("Google SDK Initialization failed", err);
      }
    };

    init();
  }, [googleButtonId, options.buttonText, router]); // Added router to deps

  const handleGoogleLogin = () => {
    if (googleLoading) return;

    if (!googleReady || !window.google?.accounts?.id) {
      setGoogleError("Google Sign-In is not ready yet. Please refresh.");
      return;
    }

    setGoogleError(null);
    setGoogleLoading(true);

    try {
      window.google.accounts.id.prompt();
    } catch (err) {
      console.error("Google prompt failed", err);
      setGoogleLoading(false);
      setGoogleError("Failed to trigger Google Sign-In");
    }
  };

  return { 
    googleLoading, 
    googleReady, 
    googleError, 
    handleGoogleLogin,
    googleButtonId 
  };
};
