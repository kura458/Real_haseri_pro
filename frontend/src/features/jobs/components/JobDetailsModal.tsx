"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { 
  MapPin, 
  Clock, 
  User,
  Briefcase,
  Layers,
  Banknote
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { resolveAssetUrl } from "@/src/utils/resolve-asset-url";

interface JobDetailsModalProps {
  job: any;
  trigger: React.ReactNode;
}

export function JobDetailsModal({ job, trigger }: JobDetailsModalProps) {
  const [open, setOpen] = useState(false);

  const categoryName = typeof job.category === 'object' ? job.category?.name : job.category || "Professional";
  const avatarSrc = resolveAssetUrl(job.customer?.avatar);
  const rating = job.customer?.average_rating ?? job.customer?.rating;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="w-[95vw] !max-w-[768px] bg-white dark:bg-slate-950 rounded-none border-4 border-slate-900 dark:border-white p-0 overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] md:shadow-[12px_12px_0px_0px_rgba(15,23,42,0.1)] flex flex-col max-h-[90vh] mx-auto">
        <div className="bg-slate-900 p-5 md:p-6 text-white relative shrink-0">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter italic leading-none flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-primary" />
              Job <span className="text-primary">Details</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
          {/* Header Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 border border-primary/10 flex items-center gap-2">
                <Layers className="w-3 h-3" />
                {categoryName}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 border border-emerald-200 flex items-center gap-2">
                <Banknote className="w-3 h-3" />
                ETB {job.price?.toLocaleString() || "0.00"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {job.created_at ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true }) : "Recently"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 border-b-2 border-slate-100 pb-2">
              Description
            </h3>
            <p className="text-sm font-bold leading-relaxed text-slate-700 dark:text-slate-300">
              {job.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Info */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 border-b-2 border-slate-100 pb-2">
                Customer Profile
              </h3>
              <div className="flex items-start gap-4 bg-slate-50/50 p-4 border border-slate-100">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Customer Avatar" className="w-10 h-10 rounded-none object-cover border border-slate-200 shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-none bg-slate-200 flex items-center justify-center shrink-0 border border-slate-300">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                )}
                <div className="flex flex-col justify-center h-10">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-900 leading-none mb-1.5">
                    {job.customer ? `${job.customer.first_name} ${job.customer.last_name}` : "Customer"}
                  </p>
                  {rating !== undefined && rating !== null ? (
                    <p className="text-[10px] font-bold text-amber-600 flex items-center gap-1 leading-none">
                      <span className="text-amber-500 text-xs">★</span> 
                      {Number(rating).toFixed(1)} Rating
                    </p>
                  ) : (
                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 leading-none">
                      New Customer
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 border-b-2 border-slate-100 pb-2">
                Location Details
              </h3>
              <div className="bg-slate-50/50 p-4 border border-slate-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="grid grid-cols-1 gap-2 w-full">
                    <div className="grid grid-cols-[80px_1fr] items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">City</span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">{job.address?.city || "Not Provided"}</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Woreda</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">{job.address?.woreda || "-"}</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Kebele</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700">{job.address?.kebele || "-"}</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] items-start mt-2 pt-2 border-t border-slate-200/60">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Specific</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-700 leading-relaxed">{job.address?.specific_location || "-"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
