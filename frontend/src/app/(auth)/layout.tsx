"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Left Side - Fixed Visual */}
      <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-10 bg-primary/10 mix-blend-overlay" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <Image
          src="/images/auth-side.png"
          alt="Haseri Platform"
          fill
          className="object-cover grayscale-[0.3]"
          priority
        />
        
        {/* Branding on Image */}
        <div className="absolute bottom-16 left-16 z-30 max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-primary flex items-center justify-center border-2 border-primary">
              <span className="text-white font-black text-3xl italic">H</span>
            </div>
            <span className="text-4xl font-black tracking-tighter text-white uppercase italic">
              Haseri<span className="text-primary">.</span>
            </span>
          </div>
          <h2 className="text-5xl font-black text-white leading-tight uppercase tracking-tighter mb-4">
            Ethiopia's Local <br /> <span className="text-primary">Marketplace</span>
          </h2>
          <p className="text-slate-300 font-medium text-lg max-w-xs border-l-4 border-primary pl-4">
            Connecting experts with opportunities. Secure, fast, and local.
          </p>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-white/10 z-20" />
        <div className="absolute bottom-20 right-0 w-20 h-[1px] bg-primary z-20" />
      </div>

      {/* Right Side - Form Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <Link href="/" className="group flex items-center gap-3 mb-6">
              <motion.div 
                whileHover={{ rotate: 90 }}
                className="w-12 h-12 bg-primary rounded-none flex items-center justify-center border-2 border-primary"
              >
                <span className="text-white font-black text-2xl italic">H</span>
              </motion.div>
              <span className="text-3xl font-black font-heading tracking-tighter text-foreground uppercase italic">
                Haseri<span className="text-primary">.</span>
              </span>
            </Link>
          </div>
          
          <div className="w-full mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to Homepage
            </Link>
          </div>

          <div className="w-full">
            {children}
          </div>
          
          <div className="mt-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Haseri Marketplace. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
