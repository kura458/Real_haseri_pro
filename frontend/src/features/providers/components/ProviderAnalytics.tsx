"use client";

import React from "react";
import { Heading } from "@/src/features/shared/components";
import { Star, Award, Briefcase, Activity } from "lucide-react";

interface ProviderAnalyticsProps {
  completedJobs?: number;
  activeContracts?: number;
}

export function ProviderAnalytics({ completedJobs = 0, activeContracts = 0 }: ProviderAnalyticsProps) {
  const analytics = [
    { label: "Provider Rating", value: "4.9", icon: Star, change: "Based on recent clients" },
    { label: "Trust Score", value: "98/100", icon: Award, change: "Highly trusted profile" },
    { label: "Total Jobs Completed", value: completedJobs.toString(), icon: Briefcase, change: `${activeContracts} currently active contracts` },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
      <Heading level={2} className="text-base font-bold mb-1">Activity & Analytics</Heading>
      <p className="text-[11px] text-slate-500 mb-5 flex items-center gap-1 font-semibold uppercase tracking-widest">
        <Activity className="w-3.5 h-3.5" /> Private to you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
        {analytics.map((item, index) => (
          <div key={index} className="pt-3 md:pt-0 md:px-4 first:pt-0 first:md:pl-0 last:md:pr-0">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-lg font-black">{item.value}</p>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {item.label}
            </p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wide font-semibold">
              {item.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
