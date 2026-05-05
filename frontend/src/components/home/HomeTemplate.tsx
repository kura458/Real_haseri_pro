// This component serves as the main template for the homepage, assembling various sections such as the hero, features, categories, and more. It also includes the navbar and footer to create a cohesive layout for the entire page.
import React from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { 
  HeroSection, 
  FeaturesSection,
  CategoriesSection, 
  HowItWorksSection,
  StatsSection,
  ExploreJobsSection,
  TopProvidersSection,
  TestimonialSection,
  FaqSection,
  CtaSection
} from "./sections";


export const HomeTemplate = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <HowItWorksSection />
        <StatsSection />
        <ExploreJobsSection />
        <TopProvidersSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};
