"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, CheckCircle2 } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left mt-12 lg:mt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 text-primary font-bold tracking-widest uppercase text-xs"
            >
              <div className="w-8 h-[2px] bg-primary" />
              <span>Premium Marketplace</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold font-heading tracking-tighter leading-[0.95] text-foreground mb-8"
            >
              Hire <span className="text-primary">Expert</span> <br /> Professionals.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              The most trusted platform for verified talent in Ethiopia.
              Quality work, guaranteed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
            >
              <Button size="lg" className="rounded-none px-10 h-14 text-lg bg-primary hover:bg-primary/90 text-white font-bold transition-all active:scale-95 border-2 border-primary" asChild>
                <Link href="/jobs">
                  EXPLORE SERVICES
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none px-10 h-14 text-lg border-2 border-foreground hover:bg-foreground hover:text-background transition-all active:scale-95" asChild>
                <Link href="/register/provider">JOIN AS PRO</Link>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-16 flex items-center justify-center lg:justify-start gap-12"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-black text-foreground">10K+</span>
                <span className="text-[10px] text-primary uppercase tracking-[0.2em] font-black">Jobs Done</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-3xl font-black text-foreground">5K+</span>
                <span className="text-[10px] text-primary uppercase tracking-[0.2em] font-black">Verified Experts</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-none overflow-hidden border-[16px] border-white dark:border-slate-800 shadow-2xl">
              <Image
                src="/images/hero.png"
                alt="Haseri Marketplace"
                width={800}
                height={800}
                className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>

            {/* Sharp Decorative Box */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary -z-10 hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
