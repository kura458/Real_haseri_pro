// This component renders the categories section on the homepage, allowing users to explore different service categories and find experts for their needs. It includes a search bar and a grid of category cards with icons and job counts.
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Hammer, Brush, Laptop, Camera, Car, Heart, Utensils, Music, GraduationCap, ChevronRight } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

const categories = [
  { name: "Home Repair", icon: Hammer, count: 120 },
  { name: "Design", icon: Brush, count: 85 },
  { name: "IT & Tech", icon: Laptop, count: 210 },
  { name: "Photography", icon: Camera, count: 64 },
  { name: "Cleaning", icon: Utensils, count: 45 },
  { name: "Automotive", icon: Car, count: 32 },
  { name: "Wellness", icon: Heart, count: 58 },
];

export const CategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
            >
              Explore Services
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase leading-none mb-6">
              Find the <span className="text-primary">Perfect</span> Expert <br /> for Your Needs.
            </h2>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="What are you looking for?" 
              className="rounded-none border-border h-14 pl-12 bg-slate-50 dark:bg-slate-900 focus-visible:border-primary transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex flex-col items-center justify-center p-6 border transition-all duration-300 group
                ${activeCategory === cat.name 
                  ? "border-primary bg-primary text-white shadow-xl shadow-primary/20" 
                  : "border-border hover:border-primary hover:bg-primary/5"}`}
            >
              <cat.icon className={`w-8 h-8 mb-4 transition-transform group-hover:scale-110 ${activeCategory === cat.name ? "text-white" : "text-primary"}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-center">{cat.name}</span>
              <span className={`text-[9px] mt-1 font-medium ${activeCategory === cat.name ? "text-white/70" : "text-muted-foreground"}`}>
                {cat.count} Jobs
              </span>
            </motion.button>
          ))}
        </div>

        {/* Featured Preview */}
        <div className="flex items-center justify-center">
          <Button variant="outline" className="rounded-none px-10 h-14 border-2 border-foreground font-black uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group">
            View All Categories
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
