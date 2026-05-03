"use client";

import React, { useEffect, useState } from "react";
import { useCustomerVerification } from "../hooks/useCustomerVerification";
import { Heading, Text, Section, Container } from "@/src/features/shared/components";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import type { CustomerVerificationStatus } from "../types";

export const VerificationPanel = () => {
  const { initiate, checkStatus, loading } = useCustomerVerification();
  const [status, setStatus] = useState<CustomerVerificationStatus | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      const data = await checkStatus();
      setStatus(data);
    };
    getStatus();
  }, []);

  const handleVerify = async () => {
    const data = await initiate();
    if (data?.checkout_url) {
      window.location.href = data.checkout_url;
    }
  };

  const isVerified = status?.verified;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 overflow-hidden shadow-2xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Status Info */}
        <div className="lg:col-span-7 p-10">
          <div className="inline-flex items-center gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-[10px]">
            <div className="w-8 h-[2px] bg-primary" />
            <span>Trust & Safety</span>
          </div>

          <Heading level={2} weight="black" uppercase className="mb-6">
            Account <br />
            {isVerified ? (
              <span className="text-primary">Verified</span>
            ) : (
              "Verification"
            )}
          </Heading>

          <Text className="mb-10 max-w-md leading-relaxed" variant="muted">
            {isVerified
              ? "Your account is fully verified. You have access to premium features and increased trust within the Haseri marketplace."
              : "Verify your identity to unlock exclusive features, build trust with providers, and ensure a secure experience on Haseri."}
          </Text>

          {isVerified ? (
            <div className="flex items-center gap-4 p-6 bg-primary/5 border border-primary/20 max-w-sm">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Verified User</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  Status active since {new Date(status?.verified_at || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleVerify}
                disabled={loading}
                className="rounded-none h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] shadow-xl"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    GET VERIFIED NOW
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="rounded-none h-14 px-8 border-2 border-foreground font-black uppercase tracking-widest text-[10px] hover:bg-foreground hover:text-background transition-all"
              >
                LEARN MORE
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Visual Element */}
        <div className="lg:col-span-5 relative min-h-[300px] flex items-center justify-center bg-slate-900 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
          </div>
          
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: isVerified ? [0, 5, 0] : [0, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            {isVerified ? (
              <div className="relative">
                <ShieldCheck className="w-40 h-40 text-primary" strokeWidth={1} />
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
              </div>
            ) : (
              <div className="relative">
                <ShieldAlert className="w-40 h-40 text-slate-700" strokeWidth={1} />
                <div className="absolute inset-0 bg-slate-500/10 blur-3xl rounded-full -z-10" />
              </div>
            )}
          </motion.div>

          {/* Sharp Decorative Corner */}
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/30" />
          <div className="absolute bottom-0 left-0 w-10 h-10 bg-primary/10" />
        </div>
      </div>
    </motion.div>
  );
};
