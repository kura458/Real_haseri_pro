"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { 
  Users, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  User,
  MessageSquare,
  Star
} from "lucide-react";
import { useJobApplications } from "../hooks/useJobApplications";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { toast } from "react-hot-toast";

interface JobApplicantsModalProps {
  jobId: string;
  jobTitle: string;
  trigger?: React.ReactNode;
}

export function JobApplicantsModal({ jobId, jobTitle, trigger }: JobApplicantsModalProps) {
  const [open, setOpen] = useState(false);
  const { applications, getApplications, accept, reject, loading } = useJobApplications();

  useEffect(() => {
    if (open) {
      getApplications(jobId);
    }
  }, [open, jobId, getApplications]);

  const handleAccept = async (id: string) => {
    try {
      await accept(id);
      toast.success("Technician hired successfully!");
    } catch (err) {
      toast.error("Failed to accept application");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await reject(id);
      toast.success("Application rejected");
    } catch (err) {
      toast.error("Failed to reject application");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none border border-slate-200 hover:border-slate-900 transition-all">
            <Users className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-white dark:bg-slate-950 rounded-none border-4 border-slate-900 dark:border-white p-0 overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,0.1)]">
        <div className="bg-slate-900 p-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black uppercase tracking-tighter italic leading-none">
              Applicants For <span className="text-primary">{jobTitle}</span>
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {loading && applications.length === 0 ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Loading potential experts...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800">
              <Users className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No applications received yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <div key={app.id} className="border-2 border-slate-900 dark:border-white bg-white dark:bg-slate-900 p-6 flex flex-col md:flex-row gap-6 relative">
                  {/* Avatar Section */}
                  <div className="flex flex-row md:flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-white overflow-hidden shrink-0">
                      {app.provider?.avatar ? (
                        <img src={app.provider.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                       <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} className={cn("w-2.5 h-2.5 fill-amber-400 text-amber-400")} />
                          ))}
                       </div>
                       <span className="text-[8px] font-black uppercase tracking-tighter mt-1">PRO VERIFIED</span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                          {app.provider?.name || "Professional Technician"}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">
                              PROPOSED: ETB {app.proposed_price?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={cn(
                        "rounded-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border shadow-none",
                        app.status === 'accepted' ? "bg-green-50 text-green-600 border-green-200" :
                        app.status === 'rejected' ? "bg-rose-50 text-rose-600 border-rose-200" :
                        "bg-amber-50 text-amber-600 border-amber-200"
                      )}>
                        {app.status}
                      </Badge>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-l-4 border-slate-900 dark:border-white">
                      <div className="flex gap-2 mb-2">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Proposal</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{app.message}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      {app.status === 'pending' && (
                        <>
                          <Button 
                            onClick={() => handleAccept(app.id.toString())}
                            className="h-10 px-6 bg-slate-900 text-white hover:bg-green-600 rounded-none font-black uppercase tracking-widest text-[9px] transition-all flex-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                            Hire Technician
                          </Button>
                          <Button 
                            onClick={() => handleReject(app.id.toString())}
                            variant="outline"
                            className="h-10 px-6 border-2 border-slate-900 dark:border-white rounded-none font-black uppercase tracking-widest text-[9px] hover:bg-rose-600 hover:text-white transition-all"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-2" />
                            Decline
                          </Button>
                        </>
                      )}
                      {app.status === 'accepted' && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Technician Hired</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
