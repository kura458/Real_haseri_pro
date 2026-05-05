"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// This component renders a call-to-action section on the homepage, encouraging users to post a job or join as a technician. It features an impressive background image of Addis Ababa city with overlay effects, and two prominent buttons for user engagement.
export const CtaSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 px-4 md:px-6">
      <div className="container mx-auto relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl">
        {/* Impressive Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542013936693-884638332954?w=1600&h=800&fit=crop" 
            alt="Addis Ababa City Background" 
            className="w-full h-full object-cover opacity-30 grayscale-[0.5] mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40" />
        </div>

        {/* Decorative Blur */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-primary/20 blur-[120px] rounded-full z-0 pointer-events-none" />

        <div className="relative z-10 py-24 px-6 md:px-12 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tighter uppercase text-white mb-6">
              Ready to Fix Your Problem?
            </h2>
            <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of Ethiopians finding trusted plumbers, electricians, painters, and electronics experts daily. Get the job done right, the first time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-none px-10 h-14 text-lg bg-primary text-white hover:bg-primary/90 font-black tracking-widest uppercase transition-all shadow-xl shadow-primary/20" asChild>
                <Link href="/jobs">
                  Post a Job Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none px-10 h-14 text-lg border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-slate-950 font-black tracking-widest uppercase transition-all group" asChild>
                <Link href="/register/provider" className="flex items-center">
                  Join as Technician
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
