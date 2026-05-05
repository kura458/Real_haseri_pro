"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import {
  FileText, User, MapPin, CheckCircle2, XCircle, AlertCircle,
  ShieldAlert, ExternalLink, Hash, Landmark, Building
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { PendingVerification } from "../types";

interface Props {
  verification: PendingVerification | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number, reason: string) => Promise<void>;
}

export function VerificationReviewModal({ verification, isOpen, onClose, onApprove, onReject }: Props) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!verification) return null;

  const handleAction = async (type: 'approve' | 'reject') => {
    if (type === 'reject' && !rejectReason.trim()) return;
    setIsSubmitting(true);
    try {
      if (type === 'approve') await onApprove(verification.id);
      else await onReject(verification.id, rejectReason);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isImage = (path?: string | null) => {
    if (!path) return false;
    return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(path);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[98vw] max-w-[98vw] md:max-w-[85vw] lg:max-w-5xl p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col max-h-[98vh] sm:rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <DialogTitle className="text-sm sm:text-lg font-black uppercase tracking-widest text-slate-900 dark:text-white mb-0.5 truncate">
                Verification Review
              </DialogTitle>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                <Hash size={9} /> {verification.id}
                <span className="opacity-30">|</span>
                {new Date(verification.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-full shrink-0">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-[8px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Pending</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left Column: Info */}
            <div className="lg:col-span-5 space-y-6">
              <section className="space-y-3">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <User size={11} /> Technician Profile
                </h4>
                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-4 space-y-4 bg-slate-50/30 dark:bg-slate-900/10">
                  <InfoItem label="Full Name" value={`${verification.user.first_name} ${verification.user.last_name}`} icon={<User size={13} />} />
                  <InfoItem label="Email Address" value={verification.user.email} icon={<FileText size={13} />} lowercase />
                </div>
              </section>

              <section className="space-y-3">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <MapPin size={11} /> Work Location
                </h4>
                <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-4 space-y-4 bg-slate-50/30 dark:bg-slate-900/10">
                  <div className="grid grid-cols-2 gap-4">
                    <InfoItem label="City" value={verification.address?.city} icon={<Building size={13} />} />
                    <InfoItem label="Woreda" value={verification.address?.woreda} icon={<Landmark size={13} />} />
                    <InfoItem label="Kebele" value={verification.address?.kebele} icon={<Hash size={13} />} />
                    <InfoItem label="Location" value={verification.address?.specific_location} icon={<MapPin size={13} />} />
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Documents */}
            <div className="lg:col-span-7 space-y-6">
              <section className="space-y-3">
                <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <FileText size={11} /> Documents
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DocCard
                    label="National ID"
                    path={verification.national_id_path}
                    isImg={isImage(verification.national_id_path)}
                  />
                  <DocCard
                    label={`Proof (${verification.proof_document_type || 'N/A'})`}
                    path={verification.proof_document_path}
                    isImg={isImage(verification.proof_document_path)}
                  />
                </div>
              </section>

              {isRejecting && (
                <section className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
                    <AlertCircle size={13} /> Rejection Reason
                  </h4>
                  <textarea
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-red-100 dark:border-red-900/20 p-3 text-[10px] font-bold focus:outline-none rounded-xl min-h-[100px] focus:border-red-500 transition-colors"
                    placeholder="Why reject?"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    autoFocus
                  />
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Footer: Equal Width Side-by-Side Action Buttons */}
        <div className="p-3 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 max-w-full">
            {!isRejecting ? (
              <>
                <Button
                  className={cn(
                    "flex-1 h-12 rounded-xl",
                    "font-black uppercase tracking-widest text-[9px] transition-all",
                    "bg-red-600 hover:bg-red-700 text-white gap-1.5 shadow-lg shadow-red-600/10"
                  )}
                  onClick={() => setIsRejecting(true)}
                  disabled={isSubmitting}
                >
                  <XCircle size={14} />
                  Reject
                </Button>
                <Button
                  className={cn(
                    "flex-1 h-12 rounded-xl",
                    "font-black uppercase tracking-widest text-[9px] transition-all",
                    "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 gap-1.5 shadow-lg shadow-slate-900/20"
                  )}
                  onClick={() => handleAction('approve')}
                  disabled={isSubmitting}
                >
                  <CheckCircle2 size={14} />
                  Approve
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1 h-12 rounded-xl",
                    "font-black uppercase tracking-widest text-[9px] transition-all",
                    "border-slate-200 dark:border-slate-800"
                  )}
                  onClick={() => setIsRejecting(false)}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  className={cn(
                    "flex-1 h-12 rounded-xl",
                    "font-black uppercase tracking-widest text-[9px] transition-all gap-1.5",
                    "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                  )}
                  onClick={() => handleAction('reject')}
                  disabled={isSubmitting || !rejectReason.trim()}
                >
                  <XCircle size={14} />
                  Confirm
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ label, value, icon, lowercase = false }: { label: string, value?: string | null, icon: React.ReactNode, lowercase?: boolean }) {
  return (
    <div className="flex items-start gap-3 min-w-0">
      <div className="p-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shrink-0 text-slate-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[7px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
        <p className={`text-[10px] font-bold uppercase truncate text-slate-900 dark:text-slate-100 ${lowercase ? 'lowercase' : ''}`}>
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

function DocCard({ label, path, isImg }: { label: string, path?: string | null, isImg: boolean }) {
  return (
    <div className="group rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-600">
      <div className="flex items-center justify-between">
        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        {path && (
          <a href={path} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors text-primary" title="Open">
            <ExternalLink size={12} />
          </a>
        )}
      </div>

      <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
        {path ? (
          isImg ? (
            <img src={path} alt={label} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <FileText className="w-6 h-6 text-slate-400" />
              <span className="text-[7px] font-bold uppercase tracking-widest text-slate-500">File</span>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <XCircle className="w-6 h-6 text-slate-300" />
            <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400">Empty</span>
          </div>
        )}
      </div>
    </div>
  );
}
