"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useJobApplications } from "../hooks/useJobApplications";
import { Loader2, User, Check, X, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { formatDate } from "@/src/utils/date-utils";
import { toast } from "react-hot-toast";

interface JobApplicantsModalProps {
  jobId: number | null;
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

export function JobApplicantsModal({ jobId, isOpen, onClose, jobTitle }: JobApplicantsModalProps) {
  const { applications, getApplications, accept, reject, loading } = useJobApplications();

  useEffect(() => {
    if (isOpen && jobId) {
      getApplications(jobId.toString());
    }
  }, [isOpen, jobId]);

  const handleAccept = async (id: number) => {
    await accept(id.toString());
    toast.success("Application accepted");
  };

  const handleReject = async (id: number) => {
    await reject(id.toString());
    toast.error("Application rejected");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase tracking-widest italic">
            Applicants: {jobTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {loading && applications.length === 0 ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : applications.length > 0 ? (
            applications.map((app) => (
              <div key={app.id} className="border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <Avatar className="h-12 w-12 rounded-full border border-slate-200 relative overflow-hidden">
                      {app.provider?.avatar ? (
                        <Image 
                          src={app.provider.avatar} 
                          alt={app.provider.name || "Provider"} 
                          fill 
                          className="object-cover" 
                        />
                      ) : null}
                      <AvatarFallback className="bg-slate-900 text-white font-bold text-sm">
                        {app.provider?.name?.[0] || <User className="w-5 h-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{app.provider?.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                        Applied on {formatDate(app.created_at)}
                      </p>
                      <div className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {app.message || "No message provided."}
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                         <span className="text-xs font-bold text-primary">Proposed: ETB {app.proposed_price || "Original"}</span>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                           app.status === 'accepted' ? 'bg-green-100 text-green-700' : 
                           app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                         }`}>
                           {app.status}
                         </span>
                      </div>
                    </div>
                  </div>

                  {app.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleReject(app.id)}
                        className="h-8 w-8 p-0 rounded-full border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleAccept(app.id)}
                        className="h-8 w-8 p-0 rounded-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500 italic text-sm">
              No applications yet for this job.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
