"use client";

import React from "react";
import { Heading } from "@/src/features/shared/components";
import { Briefcase, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRecentJobs } from "@/src/features/public/hooks";
import { formatDate } from "@/src/utils/date-utils";

export function ProviderRecentJobs() {
  const { jobs, loading } = useRecentJobs();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <Heading level={2} className="text-base font-bold">Recent Jobs</Heading>
        </div>
        <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-primary h-auto p-0">
          View All <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {loading ? (
          <div className="p-6 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-2">
                  <Heading level={3} className="text-sm font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </Heading>
                  
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.city || "N/A"}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDate(job.created_at)}</span>
                  </div>

                  {job.category ? (
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {job.category}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 shrink-0">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    ETB {job.price}
                  </p>
                  <Button className="h-8 text-[10px] font-black uppercase tracking-widest rounded-none shadow-md">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-sm text-slate-500">
            No recent jobs available.
          </div>
        )}
      </div>
    </div>
  );
}
