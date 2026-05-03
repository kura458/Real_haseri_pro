"use client";

import React from "react";
import { VerificationPanel } from "@/src/features/customers/components";
import { Container, Section, Heading, Text } from "@/src/features/shared/components";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function CustomerVerifyPage() {
  return (
    <Section padding="none" className="min-h-screen bg-muted/20 pb-20">
      <div className="bg-slate-900 text-white pt-32 pb-20 border-b border-primary/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6"
          >
            <div className="w-20 h-20 bg-primary/20 border-2 border-primary flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-primary font-bold tracking-widest uppercase text-[10px]">
                <div className="w-6 h-[1px] bg-primary" />
                <span>Security & Trust</span>
              </div>
              <Heading level={1} weight="black" uppercase className="text-4xl md:text-5xl">
                Verification
              </Heading>
            </div>
          </motion.div>
        </Container>
      </div>

      <Container className="-mt-10 relative z-10">
        <div className="max-w-5xl">
          <VerificationPanel />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 border border-border/50">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Priority Support</p>
              <Text size="sm" variant="muted">Verified users get faster response times from our dedicated support team.</Text>
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 border border-border/50">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Trust Badge</p>
              <Text size="sm" variant="muted">A visible verification badge on your profile increases trust with top-tier providers.</Text>
            </div>
            <div className="p-8 bg-white dark:bg-slate-900 border border-border/50">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Secure Deals</p>
              <Text size="sm" variant="muted">Access to higher transaction limits and enhanced security protocols.</Text>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
