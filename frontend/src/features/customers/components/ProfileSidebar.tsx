"use client";

import React from "react";
import { Heading, Text } from "@/src/features/shared/components";
import { Shield, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import { CustomerVerificationModal } from "./CustomerVerificationModal";

export function ProfileSidebar() {
  const { user } = useAuth();
  const isVerified = user?.is_verified;

  return (
    <div className="flex flex-col h-full space-y-px bg-slate-200 dark:bg-slate-800">
       <div className="bg-primary text-white p-6 flex-1 flex flex-col justify-center">
          <Heading level={3} weight="black" uppercase className="text-base mb-2 tracking-widest italic flex items-center gap-2">
            HASERI PRO
          </Heading>
          <Text className="text-white/90 text-[11px] font-bold leading-relaxed mb-5 uppercase tracking-tight">
            Premium marketplace features and lower transaction fees.
          </Text>
          <Button className="w-full bg-white text-primary hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] rounded-full h-10 mt-auto shadow-sm">
            Upgrade Now
          </Button>
       </div>

       <div className="bg-white dark:bg-slate-900 p-6 flex-1 flex flex-col justify-center">
          <Heading level={3} weight="black" uppercase className="text-xs mb-3 tracking-widest text-slate-900 dark:text-white">
            Verification
          </Heading>
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 mb-5">
             <div className={`w-8 h-8 flex items-center justify-center rounded-md shrink-0 ${isVerified ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                {isVerified ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
             </div>
             <div className="overflow-hidden">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white truncate">
                  {isVerified ? "Verified" : "Unverified"}
                </p>
                <p className="text-[8px] font-bold text-slate-500 uppercase truncate">
                  {isVerified ? "Trusted identity" : "Required for safety"}
                </p>
             </div>
          </div>
          {!isVerified && (
            <CustomerVerificationModal
              trigger={
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] rounded-full h-10 mt-auto"
                >
                  Start Verification
                </Button>
              }
            />
          )}
       </div>
    </div>
  );
}
