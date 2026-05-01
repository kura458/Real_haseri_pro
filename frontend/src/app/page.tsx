import React from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { HeroSection } from "@/src/components/home/HeroSection";
import { CategoryFilter } from "@/src/components/home/CategoryFilter";
import { HowItWorks } from "@/src/components/home/HowItWorks";
import { Footer } from "@/src/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <CategoryFilter />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}