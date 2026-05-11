// Task :HAS-32 - Implemening Login user interface
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { env } from "@/src/config/env";
import { userAuthApi } from "../services";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { emailSchema, phoneSchema, passwordSchema } from "@/src/utils/validators";
import { getRequiredSchemaError } from "@/src/utils/validators/form";
import { useGoogleRegister } from "../../shared";

declare global {
  interface Window {
    google?: any;
  }
}

export const LoginForm = () => {
  const { login, loading, error } = useLogin();
  const { setUser } = useAuth();
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [usePhone, setUsePhone] = useState(false);
  const [touched, setTouched] = useState({ identity: false, password: false });
  const [errors, setErrors] = useState<{ identity?: string | null; password?: string | null }>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const identityError = usePhone
      ? getRequiredSchemaError(phoneSchema, identity, "Phone number is required")
      : getRequiredSchemaError(emailSchema, identity, "Email address is required");
    const passwordError = getRequiredSchemaError(passwordSchema, password, "Password is required");

    setErrors({ identity: identityError, password: passwordError });
    setTouched({ identity: true, password: true });
    if (identityError || passwordError) return;

    const loginData = usePhone
      ? { phone: identity, password }
      : { email: identity, password };

    await login(loginData);
  };

  const updateIdentity = (value: string) => {
    setIdentity(value);
    if (touched.identity) {
      const identityError = usePhone
        ? getRequiredSchemaError(phoneSchema, value, "Phone number is required")
        : getRequiredSchemaError(emailSchema, value, "Email address is required");
      setErrors((prev) => ({ ...prev, identity: identityError }));
    }
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    if (touched.password) {
      const passwordError = getRequiredSchemaError(passwordSchema, value, "Password is required");
      setErrors((prev) => ({ ...prev, password: passwordError }));
    }
  };

  const googleAuth = useGoogleRegister();



  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-6 sm:p-10 shadow-2xl shadow-primary/5 rounded-none"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">Welcome Back</h1>
          <p className="text-foreground/80 text-sm font-semibold tracking-wide">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80">
                {usePhone ? "Phone Number" : "Email Address"}
              </label>
              <button
                type="button"
                onClick={() => {
                  setUsePhone(!usePhone);
                  setIdentity("");
                  setErrors((prev) => ({ ...prev, identity: null }));
                  setTouched((prev) => ({ ...prev, identity: false }));
                }}
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary hover:text-primary/80 transition-colors"
              >
                Use {usePhone ? "Email" : "Phone"}
              </button>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors flex items-center gap-2">
                {usePhone ? (
                  <div className="flex items-center gap-1.5 border-r border-border pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 640 480" className="rounded-sm shadow-sm">
                      <path fill="#006233" d="M0 0h640v160H0z" />
                      <path fill="#fce300" d="M0 160h640v160H0z" />
                      <path fill="#ef3340" d="M0 320h640v160H0z" />
                      <g transform="translate(320 240) scale(1.06667)">
                        <circle r="120" fill="#0039a6" />
                        <path fill="none" stroke="#fce300" strokeWidth="12" d="M0-100l23.5 72.4h76.1L38.2 16.8l23.5 72.4L0 44.8l-61.7 44.4 23.5-72.4-61.4-44.4h76.1z" />
                        <circle r="25" fill="#fce300" />
                      </g>
                    </svg>
                    <span className="text-[11px] font-black text-foreground tracking-tighter">+251</span>
                  </div>
                ) : (
                  <Mail className="w-4 h-4" />
                )}
              </div>
              <Input
                type={usePhone ? "tel" : "email"}
                placeholder={usePhone ? "912345678" : "alex@example.com"}
                value={identity}
                onChange={(e) => updateIdentity(e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, identity: true }))
                }
                className={`rounded-none border border-border h-14 ${usePhone ? "pl-24" : "pl-12"} focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50`}
              />
            </div>
            {touched.identity && errors.identity && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {errors.identity}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/80">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors"
              >
                Reset?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => updatePassword(e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, password: true }))
                }
                className="rounded-none border border-border h-14 pl-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50"
              />
            </div>
            {touched.password && errors.password && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {errors.password}
              </p>
            )}
          </div>

          {error && (
            <div className="p-4 bg-destructive/5 border-l-4 border-destructive text-destructive text-[10px] font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98]"
          >
            {loading ? "Authenticating..." : "Login to Account"}
            {!loading && <ArrowRight className="ml-3 w-4 h-4" />}
          </Button>
        </form>

        <div className="mt-12">
          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
              <span className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm px-6 text-muted-foreground">Security Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={googleAuth.handleGoogleLogin}
              disabled={googleAuth.googleLoading}
              className="rounded-none h-14 border border-border bg-white text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white/90 transition-all"
            >
              <span className="flex items-center">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  className="mr-3"
                >
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.22 3.63l6.86-6.86C35.94 2.62 30.44 0 24 0 14.62 0 6.47 5.38 2.56 13.22l8.01 6.22C12.35 13.08 17.73 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.14 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.44c-.54 2.9-2.18 5.35-4.65 7.01l7.19 5.58c4.2-3.88 6.16-9.6 6.16-16.84z" />
                  <path fill="#FBBC05" d="M10.57 28.44a14.5 14.5 0 0 1-.76-4.44c0-1.54.27-3.03.76-4.44l-8.01-6.22A24 24 0 0 0 0 24c0 3.84.9 7.47 2.56 10.78l8.01-6.34z" />
                  <path fill="#34A853" d="M24 48c6.44 0 11.86-2.12 15.81-5.76l-7.19-5.58c-2.01 1.35-4.58 2.15-8.62 2.15-6.27 0-11.65-3.58-14.02-8.78l-8.01 6.34C6.47 42.62 14.62 48 24 48z" />
                </svg>
                {googleAuth.googleLoading ? "Connecting..." : "Sign in with Google"}
              </span>
            </Button>
            {googleAuth.googleError && (
              <p className="text-[10px] text-destructive font-semibold uppercase tracking-wider">
                {googleAuth.googleError}
              </p>
            )}
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-medium text-muted-foreground tracking-tight">
          New to Haseri?{" "}
          <Link href="/register/customer" className="text-primary font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
            Join the Marketplace
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
