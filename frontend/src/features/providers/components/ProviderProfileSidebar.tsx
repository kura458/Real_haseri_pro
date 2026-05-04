"use client";

import React from "react";
import { Heading, Text } from "@/src/features/shared/components";
import { Shield, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import { ProviderVerificationModal } from "./ProviderVerificationModal";

export function ProviderProfileSidebar() {
  const { user } = useAuth();
  const status = user?.technician_verification?.status;
  const isVerified = status === "approved";

  return (
    <div className="flex flex-col h-48 md:h-64 bg-slate-200 dark:bg-slate-800">
      <div className="bg-slate-900 text-white p-6 flex-1 flex flex-col">
        <Heading level={3} weight="black" uppercase className="text-base mb-2 tracking-widest italic flex items-center gap-2">
          VERIFY IDENTITIES
        </Heading>
        <Text className="text-white/80 text-[11px] font-bold leading-relaxed uppercase tracking-tight">
          Verify identities for premium job access on the Haseri marketplace with national IDs.
        </Text>

        <div className="mt-4 flex items-center gap-3 p-3 rounded-lg border border-white/15 bg-white/5">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-md shrink-0 ${
              isVerified ? "bg-white/15 text-white" : "bg-white/10 text-white"
            }`}
          >
            {isVerified ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black uppercase tracking-widest truncate">
              {isVerified ? "Verified" : "Unverified"}
            </p>
            <p className="text-[8px] font-bold uppercase truncate text-white/70">
              {isVerified ? "Trusted technician" : "Required for safety"}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4">
          {!isVerified && (
            <ProviderVerificationModal
              trigger={
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest text-[10px] rounded-full h-10">
                  Start Verification
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
