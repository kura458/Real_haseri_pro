// Task: HAS-33 - Implementing User registration user interface
"use client";

import React from "react";
import { RegisterForm } from "@/src/features/auth/user/components/RegisterForm";
import { useGoogleRegister } from "@/src/features/auth/shared";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const registerDataKey = "haseri:register:data";
  const googleUserKey = "haseri:register:google";

  const { googleError, googleButtonId } = useGoogleRegister({
    buttonText: "signup_with",
    onNewUser: (userId) => {
      if (userId) {
        sessionStorage.setItem(googleUserKey, userId);
      }
      router.push("/register/role");
    },
    onExistingUser: (user) => {
      setUser(user as any);
      router.push("/dashboard");
    },
  });

  const handleDetailsSubmit = async (data: { [key: string]: string }) => {
    sessionStorage.setItem(registerDataKey, JSON.stringify(data));
    router.push("/register/role");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
      <RegisterForm mode="details" submitLabel="Continue" onSubmit={handleDetailsSubmit}>
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
            <span className="bg-white dark:bg-slate-950 px-6 text-foreground/80">Or</span>
          </div>
        </div>

        <div className="w-full h-14 rounded-none border border-border bg-white text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/90 transition-all shadow-lg shadow-slate-200/50 dark:shadow-none flex items-center justify-center">
          <div id={googleButtonId} className="w-full" />
        </div>

        {googleError && (
          <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider mt-4">
            {googleError}
          </p>
        )}
      </RegisterForm>
    </div>
  );
}
