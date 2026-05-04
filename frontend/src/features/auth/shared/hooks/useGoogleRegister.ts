"use client";

import { useEffect, useState } from "react";
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

export const useGoogleRegister = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

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
        router.push("/register/role");
        return;
      }
      if (payload?.user) {
        setUser(payload.user);
        router.push(payload.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
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
            use_fedcm_for_prompt: false, // Set to false for better compatibility
            auto_select: false,
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

  const handleGoogleLogin = () => {
    if (googleLoading) return;
    
    if (!googleReady || !window.google?.accounts?.id) {
      setGoogleError("Google Sign-In is not ready yet. Please refresh.");
      return;
    }

    setGoogleError(null);
    setGoogleLoading(true);
    
    try {
      window.google.accounts.id.prompt((notification: any) => {
        console.log("Google Prompt Notification:", notification.getMomentType(), notification.isDisplayMoment());
        
        if (notification.isNotDisplayed()) {
          console.warn("Google Prompt not displayed:", notification.getNotDisplayedReason());
          setGoogleError("Please check your browser settings or try again later.");
          setGoogleLoading(false);
        }
        
        if (notification.isSkippedMoment()) {
          console.warn("Google Prompt skipped:", notification.getSkippedReason());
          setGoogleLoading(false);
        }

        if (notification.isDismissedMoment()) {
           setGoogleLoading(false);
        }
      });
    } catch (err) {
      console.error("Google prompt failed", err);
      setGoogleLoading(false);
      setGoogleError("Failed to trigger Google Sign-In");
    }
  };

  return { googleLoading, googleReady, googleError, handleGoogleLogin };
};
