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
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { 
  Briefcase, 
  Send, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { useJobApplications } from "../hooks/useJobApplications";
import { useTechnicianApplications } from "../hooks/useTechnicianApplications";
import { toast } from "react-hot-toast";
import { clientApi } from "@/src/lib/api/client";

interface JobApplyModalProps {
  job: any;
  application?: any;
  isEdit?: boolean;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function JobApplyModal({ job, application, isEdit, trigger, onSuccess }: JobApplyModalProps) {
  const [open, setOpen] = useState(false);
  const { apply, loading: applyLoading } = useJobApplications();
  const { updateApplication, loading: updateLoading } = useTechnicianApplications();
  
  const [verificationStatus, setVerificationStatus] = useState<string>("approved");
  const [checkingStatus, setCheckingStatus] = useState(false);

  useEffect(() => {
    if (open && !isEdit) {
      setCheckingStatus(true);
      clientApi.get("/applications/status")
        .then(res => setVerificationStatus(res.data.data.status))
        .catch(() => setVerificationStatus("approved"))
        .finally(() => setCheckingStatus(false));
    }
  }, [open, isEdit]);

  const loading = isEdit ? updateLoading : applyLoading;

  const [formData, setFormData] = useState({
    proposed_price: isEdit ? application?.proposed_price?.toString() : (job?.price?.toString() || ""),
    message: isEdit ? application?.message : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      const result = await updateApplication(application.id.toString(), {
        proposed_price: parseFloat(formData.proposed_price),
        message: formData.message,
      });

      if (result.success) {
        toast.success("Application updated successfully!");
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to update application");
      }
    } else {
      const result = await apply(job.id.toString(), {
        proposed_price: parseFloat(formData.proposed_price),
        message: formData.message,
      });

      if (result.success) {
        toast.success("Application submitted successfully!");
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(result.error || "First verify your identity");
      }
    }
  };

  const isRestricted = verificationStatus !== "approved" && !isEdit;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="h-10 px-6 bg-primary text-white hover:bg-rose-700 rounded-none font-black uppercase tracking-widest text-[9px] transition-all">
            {isEdit ? "Edit Application" : "Apply Now"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-white dark:bg-slate-950 rounded-none border-4 border-slate-900 dark:border-white p-0 overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,0.1)] flex flex-col">
        <div className="bg-slate-900 p-5 md:p-6 text-white relative shrink-0">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter italic leading-none flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-primary" />
              {isEdit ? "Edit Application" : "Apply Jobs"}
            </DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposed_price" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Proposed Rate (ETB)</Label>
            <Input
              id="proposed_price"
              type="number"
              placeholder="0.00"
              required
              className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 font-bold text-xs h-12 bg-slate-50/50"
              value={formData.proposed_price}
              onChange={(e) => setFormData({ ...formData, proposed_price: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Proposal</Label>
            <Textarea
              id="message"
              placeholder="ENTER YOUR PROPOSAL..."
              required
              rows={4}
              className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 font-bold text-xs bg-slate-50/50 resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={loading || isRestricted || checkingStatus}
              className="w-full h-14 bg-slate-900 text-white hover:bg-primary rounded-none font-black uppercase tracking-widest text-[11px] transition-all disabled:opacity-50"
            >
              {checkingStatus ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : isRestricted ? (
                "First verify your identity"
              ) : loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {isEdit ? "Update" : "Submit"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
