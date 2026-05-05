"use client";

import React, { useEffect, useState } from "react";
import { useJobs } from "../../jobs/hooks/useJobs";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { 
  Search, 
  RefreshCcw, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  ExternalLink,
  DollarSign,
  MapPin,
  Calendar
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { format } from "date-fns";

export function AdminJobsTable() {
  const { jobs, loading, getJobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.customer?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "open":
        return { label: "Open", icon: Clock, className: "bg-green-50 text-green-700 border-green-200" };
      case "assigned":
        return { label: "Assigned", icon: CheckCircle2, className: "bg-blue-50 text-blue-700 border-blue-200" };
      case "in_progress":
        return { label: "In Progress", icon: Activity, className: "bg-amber-50 text-amber-700 border-amber-200" };
      case "completed":
        return { label: "Completed", icon: CheckCircle2, className: "bg-slate-900 text-white border-slate-900" };
      case "cancelled":
        return { label: "Cancelled", icon: XCircle, className: "bg-red-50 text-red-700 border-red-200" };
      default:
        return { label: status, icon: Clock, className: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          <Input 
            placeholder="SEARCH JOBS BY TITLE OR CUSTOMER..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-none focus:border-slate-900 dark:focus:border-white transition-all font-black uppercase tracking-widest text-[10px]"
          />
        </div>
        <Button 
          onClick={() => getJobs()}
          variant="outline"
          className="h-12 w-12 p-0 border-2 border-slate-100 hover:border-slate-900 rounded-none bg-white dark:bg-slate-900 self-end md:self-auto"
        >
          <RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} />
        </Button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Job Reference</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category & Location</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Financials</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => {
                  const status = getStatusConfig(job.status);
                  const Icon = status.icon;
                  
                  return (
                    <tr key={job.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white line-clamp-1">
                            {job.title}
                          </span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                            REF: #{job.id} • {format(new Date(job.created_at), "MMM d, yyyy")}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-600 uppercase">
                            {job.customer?.name.charAt(0)}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                            {job.customer?.name || "Anonymous"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <Briefcase size={10} className="text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">{job.category || "General"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={10} className="text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                              {job.address?.city || "Unknown City"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <DollarSign size={12} className="text-slate-900 dark:text-white" />
                            <span className="text-xs font-black text-slate-900 dark:text-white">{job.price.toLocaleString()}</span>
                          </div>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                            Comm: {job.commission.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 border rounded-full",
                          status.className
                        )}>
                          <Icon size={10} />
                          <span className="text-[8px] font-black uppercase tracking-widest">{status.label}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-9 w-9 p-0 rounded-none hover:bg-slate-900 hover:text-white transition-all"
                        >
                          <ExternalLink size={14} />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <Briefcase size={40} className="text-slate-400" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">No Jobs Found</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Missing import fix
const Activity = (props: any) => (
  <svg 
    {...props} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
