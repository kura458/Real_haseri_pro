//  This component renders the features section on the homepage, highlighting the key benefits of using the Haseri platform for hiring local technicians in Ethiopia. It includes animated headings, descriptive text, and visually appealing images to showcase the platform's reliability and seamless booking experience.
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            Enterprise-Grade Reliability
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase mb-6">
            Built for <span className="text-primary">Quality</span> & Trust.
          </h2>
        </div>

        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-foreground">Verified Local Experts</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Whether you need a reliable electrician, a professional house painter, or a skilled dish installer, our enterprise-grade verification system ensures you only connect with vetted professionals. We conduct background checks and verify skills so you can hire with complete peace of mind.
            </p>
            <ul className="space-y-3 font-medium text-foreground">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Strict identity verification
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Skill and certification checks
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Continuous quality monitoring
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="relative border-[12px] border-white dark:border-slate-800 shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop" 
                alt="Verified Technician in Ethiopia" 
                className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 -z-10" />
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-foreground/5 -z-10" />
          </motion.div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-foreground">Fast & Seamless Booking</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our platform operates like a top-tier enterprise application, offering a frictionless experience from search to payment. Instantly find plumbers, electronics repairers, and house painters. Describe your issue, set your location, and get connected instantly.
            </p>
            <ul className="space-y-3 font-medium text-foreground">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Instant matching algorithm
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Secure, milestone-based payments
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Real-time tracking and updates
              </li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="relative border-[12px] border-white dark:border-slate-800 shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop" 
                alt="Plumbing and Maintenance Ethiopia" 
                className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 -z-10" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-foreground/5 -z-10" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
