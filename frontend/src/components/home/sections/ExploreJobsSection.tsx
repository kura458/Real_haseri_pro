"use client";

//  HAS-41 Explore  the job selection  and Allow technicians to update location and availability information
import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, DollarSign, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";

// Sample job data to display in the Explore Jobs section
const jobs = [
  {
    id: 1,
    title: "Complete Home Wiring for New Villa",
    category: "Home Repair",
    budget: "15,000 ETB",
    location: "Addis Ababa, Summit",
    postedAt: "2 hours ago",
    urgency: "High",
  },
  {
    id: 2,
    title: "Logo & Branding for Coffee Shop",
    category: "Design",
    budget: "5,000 ETB",
    location: "Remote",
    postedAt: "5 hours ago",
    urgency: "Medium",
  },
  {
    id: 3,
    title: "Fix Leaking Pipes in Bathroom",
    category: "Plumbing",
    budget: "Negotiable",
    location: "Addis Ababa, Ayat",
    postedAt: "1 day ago",
    urgency: "High",
  },
];

export const ExploreJobsSection = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4"
          >
            Latest Opportunities
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black font-heading tracking-tighter uppercase leading-none mb-6">
            Explore <span className="text-primary">Recent</span> Jobs.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-medium">
            Find the perfect task that matches your skills. Apply, complete the work, and get paid securely.
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-4xl mx-auto mb-12">
          {jobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white dark:bg-slate-950 border border-border hover:border-primary p-6 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1">
                    {job.category}
                  </span>
                  {job.urgency === "High" && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-1">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{job.postedAt}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Button className="w-full md:w-auto rounded-none px-8 bg-background text-foreground border-2 border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all font-bold text-xs tracking-widest uppercase h-12">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="rounded-none px-10 h-14 border-2 border-foreground font-black uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-all group">
            Browse All Jobs
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
