"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { ShieldCheck, ShieldAlert, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCustomerVerification } from "../hooks/useCustomerVerification";

interface CustomerVerificationModalProps {
  trigger?: React.ReactNode;
}

export function CustomerVerificationModal({ trigger }: CustomerVerificationModalProps) {
  const { initiate, checkStatus, loading, error } = useCustomerVerification();
  const [status, setStatus] = useState<{ verified: boolean; verified_at: string | null } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const getStatus = async () => {
      const data = await checkStatus();
      setStatus(data);
    };
    getStatus();
  }, [isOpen, checkStatus]);

  const handleVerify = async () => {
    setLocalError(null);
    const data = await initiate();
    const checkoutUrl =
      (data as any)?.checkout_url ||
      (data as any)?.checkoutUrl ||
      (data as any)?.url ||
      (data as any)?.data?.checkout_url ||
      (data as any)?.data?.checkoutUrl ||
      null;

    if (checkoutUrl) {
      toast.loading("Redirecting to Chapa...", { duration: 2000 });
      window.location.href = checkoutUrl;
      return;
    }

    const message = error || "Failed to initiate verification. Please try again.";
    setLocalError(message);
    toast.error(message);
  };

  const isVerified = status?.verified;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-none h-11 font-black uppercase tracking-widest text-[10px]">
            Verify Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg min-h-[320px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 resize overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">
            Customer Verification
          </DialogTitle>
          <DialogDescription className="text-[11px] font-semibold text-slate-500">
            One-time identity check. You will be redirected to Chapa to complete payment.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
          <div className="flex items-center gap-3">
            {isVerified ? (
              <ShieldCheck className="w-5 h-5 text-primary" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-slate-500" />
            )}
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
                {isVerified ? "Verified" : "Not Verified"}
              </p>
              <p className="text-[10px] font-semibold text-slate-500">
                {isVerified && status?.verified_at
                  ? `Active since ${new Date(status.verified_at).toLocaleDateString()}`
                  : "Complete verification to unlock full access."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          {localError && (
            <p className="w-full text-[10px] font-semibold text-red-600 text-center">
              {localError}
            </p>
          )}
          {!isVerified ? (
            <Button
              onClick={handleVerify}
              disabled={loading}
              className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Start Verification
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full h-11 border-slate-300 dark:border-slate-700 font-black uppercase tracking-widest text-[10px]"
            >
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
