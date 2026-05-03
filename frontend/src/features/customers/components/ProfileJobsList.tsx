"use client";

import React from "react";
import { Heading } from "@/src/features/shared/components";
import { Briefcase, MapPin, Calendar, Edit3, MoreHorizontal, Plus, Users, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { formatDate } from "@/src/utils/date-utils";
import type { Job } from "@/src/features/jobs/types";

interface ProfileJobsListProps {
  jobs: Job[];
  loading: boolean;
}

export function ProfileJobsList({ jobs, loading }: ProfileJobsListProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level={2} className="text-xl font-bold mb-1">Recent Job Posts</Heading>
          <p className="text-xs text-slate-500 font-medium">Manage your active service requests</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 h-10 font-black uppercase tracking-widest text-[10px] gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="group border border-slate-100 dark:border-slate-800 rounded-xl p-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 w-full">
                  <div className="mt-1 p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shrink-0">
                    <Briefcase className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors cursor-pointer pr-4">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors" title="Edit Job">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors" title="More Options">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary/70" />
                        {job.address?.city || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary/70" />
                        {job.created_at ? formatDate(job.created_at) : "N/A"}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                        <Users className="w-3 h-3" />
                        {(job as any).applications_count || 0} Applicants
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                        job.status === 'open' ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {job.status}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">ETB {job.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">No jobs posted yet.</p>
          </div>
        )}
      </div>
      
      <Button variant="ghost" className="w-full mt-4 text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
        View All History
      </Button>
    </div>
  );
}
