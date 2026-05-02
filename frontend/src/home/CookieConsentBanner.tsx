"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Cookie, X, ChevronDown } from "lucide-react";

const CONSENT_KEY = "haseri:cookie-consent";

export const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Small delay so it smoothly appears after page loads
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  };

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 md:bottom-6 left-0 w-full z-[100] flex justify-center px-0 md:px-6 pointer-events-none"
        >
          <div className="w-full max-w-7xl pointer-events-auto bg-slate-50 dark:bg-slate-900 border border-border/50 shadow-2xl rounded-t-2xl md:rounded-2xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
            
            {/* Center Dropdown Handle */}
            <button 
              onClick={handleReject} 
              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-50 dark:bg-slate-900 border border-border/50 rounded-full p-1 shadow-sm text-muted-foreground hover:text-foreground transition-all hover:translate-y-0.5 group"
              aria-label="Dismiss banner"
            >
              <ChevronDown className="w-4 h-4 group-hover:text-primary transition-colors" />
            </button>

            <button 
              onClick={handleReject} 
              className="absolute top-5 right-5 md:hidden text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pr-8 md:pr-0">
              <div className="p-3 bg-foreground/5 rounded-full hidden sm:block shrink-0">
                <Cookie className="w-6 h-6 text-foreground/80" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-foreground">
                  Cookie Consent
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  We use cookies to improve your browsing experience and analyze site traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
              <Button
                variant="outline"
                className="flex-1 md:flex-none font-bold text-xs h-10 px-6 rounded-lg border-border bg-transparent hover:bg-foreground/5 transition-all"
                onClick={handleReject}
              >
                Decline
              </Button>
              <Button
                className="flex-1 md:flex-none bg-foreground text-background hover:bg-foreground/90 font-bold text-xs h-10 px-8 rounded-lg shadow-md transition-all"
                onClick={handleAccept}
              >
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
