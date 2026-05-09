"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/src/components/ui/select";
import {
  Plus,
  Loader2,
  Briefcase,
  MapPin,
  Layers,
  AlertCircle
} from "lucide-react";
import { useCreateJob } from "../hooks";
import { jobsApi } from "../services";
import { Job, JobCategory } from "../types";
import { useAuth } from "@/src/hooks/useAuth";
import { toast } from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import { JobPaymentModal } from "@/src/features/payments";

interface PostJobModalProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  job?: Job;
}

export function PostJobModal({ trigger, onSuccess, job }: PostJobModalProps) {
  const isEdit = !!job;
  const { user } = useAuth();
  const router = useRouter();
  const { create, loading: creating } = useCreateJob();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pendingJobData, setPendingJobData] = useState<any>(null);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [formData, setFormData] = useState({
    title: job?.title || "",
    description: job?.description || "",
    category_id: (typeof job?.category === 'object' ? (job.category as any)?.id : job?.category_id)?.toString() || "",
    price: job?.price?.toString() || "",
    city: job?.address?.city || user?.address?.city || user?.city || "",
    woreda: job?.address?.woreda || "",
    kebele: job?.address?.kebele || "",
    specific_location: job?.address?.specific_location || user?.address?.specific_location || "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        description: job.description,
        category_id: (typeof job.category === 'object' ? (job.category as any)?.id : job.category)?.toString() || "",
        price: job.price.toString(),
        city: job.address?.city || "",
        woreda: job.address?.woreda || "",
        kebele: job.address?.kebele || "",
        specific_location: job.address?.specific_location || "",
      });
    }
  }, [job, open]);

  useEffect(() => {
    if (open) {
      const fetchCategories = async () => {
        try {
          const res = await jobsApi.getCategories();
          setCategories(res.data.data);
        } catch (err) {
          console.error("Failed to fetch categories", err);
        }
      };
      fetchCategories();

      // Auto-fill address if user data is available
      if (user) {
        setFormData(prev => ({
          ...prev,
          city: user.address?.city || user.city || prev.city,
          woreda: user.address?.woreda || prev.woreda,
          kebele: user.address?.kebele || prev.kebele,
          specific_location: user.address?.specific_location || prev.specific_location,
        }));
      }
    }
  }, [open, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category_id) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);
    try {
      if (isEdit && job) {
        await jobsApi.update(job.id.toString(), {
          title: formData.title,
          description: formData.description,
          category_id: parseInt(formData.category_id),
          price: parseFloat(formData.price),
          city: formData.city,
          woreda: formData.woreda,
          kebele: formData.kebele,
          specific_location: formData.specific_location,
        });
        toast.success("Job updated successfully!");
      } else {
        const result = await create({
          title: formData.title,
          description: formData.description,
          category_id: parseInt(formData.category_id),
          price: parseFloat(formData.price),
          city: formData.city,
          woreda: formData.woreda,
          kebele: formData.kebele,
          specific_location: formData.specific_location,
        });
        if (!result) throw new Error("Failed to create job");
        toast.success("Job posted successfully!");
      }

      setOpen(false);
      if (!isEdit) {
        setFormData({
          title: "",
          description: "",
          category_id: "",
          price: "",
          city: user?.address?.city || user?.city || "",
          woreda: "",
          kebele: "",
          specific_location: user?.address?.specific_location || "",
        });
      }
      onSuccess?.();
    } catch (err: any) {
      // client.ts interceptor transforms AxiosError into a custom Error object
      // with .errors and .status properties
      const errors = err.errors || {};
      const errorMsg = String(err.message || "").toLowerCase();

      const isLimitReached = errors.limit_reached ||
        errors.payment_required ||
        errors.verification_required ||
        errorMsg.includes("limit") ||
        errorMsg.includes("trial") ||
        errorMsg.includes("pay") ||
        errorMsg.includes("verification") ||
        errorMsg.includes("maximum") ||
        err.status === 402 ||
        err.status === 403;

      if (isLimitReached) {
        setPendingJobData({
          title: formData.title,
          description: formData.description,
          category_id: parseInt(formData.category_id),
          price: parseFloat(formData.price),
          city: formData.city,
          woreda: formData.woreda,
          kebele: formData.kebele,
          specific_location: formData.specific_location,
        });
        setOpen(false);
        setPaymentModalOpen(true);
      } else {
        toast.error(errorData?.error || errorData?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button className="bg-slate-900 text-white hover:bg-primary rounded-none font-black uppercase tracking-widest text-[10px] h-12 px-6 transition-all active:translate-x-1 active:translate-y-1">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-[740px] w-[95vw] md:w-full bg-white dark:bg-slate-950 rounded-none border-4 border-slate-900 dark:border-white p-0 overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,0.1)] max-h-[92vh] flex flex-col">
          <div className="bg-slate-900 p-5 md:p-6 text-white relative shrink-0">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-black uppercase tracking-tighter italic leading-none">
                {isEdit ? "Edit" : "Post"} <span className="text-primary">{isEdit ? "Job Details" : "New Job"}</span>
              </DialogTitle>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Job Title</Label>
                <Input
                  id="title"
                  placeholder="E.G. EMERGENCY PLUMBING FIX"
                  required
                  className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 uppercase font-bold text-xs h-12 bg-slate-50/50"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Category</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(val) => setFormData({ ...formData, category_id: val })}
                >
                  <SelectTrigger id="category" className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 uppercase font-bold text-xs h-12 bg-slate-50/50">
                    <SelectValue placeholder="SELECT CATEGORY" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-slate-900 p-0">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()} className="text-xs font-black uppercase tracking-widest py-3 focus:bg-slate-900 focus:text-white rounded-none">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Description</Label>
              <Textarea
                id="description"
                placeholder="DESCRIBE THE TASK IN DETAIL..."
                required
                rows={4}
                className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 font-bold text-xs bg-slate-50/50 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Budget (ETB)</Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    required
                    className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 font-bold text-xs h-12 px-4 bg-slate-50/50"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest text-slate-500">City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="city"
                    placeholder="ADDIS ABABA"
                    required
                    className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 uppercase font-bold text-xs h-12 pl-10 bg-slate-50/50"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="woreda" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Woreda</Label>
                <Input
                  id="woreda"
                  placeholder="E.G. WOREDA 01"
                  className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 uppercase font-bold text-xs h-12 bg-slate-50/50"
                  value={formData.woreda}
                  onChange={(e) => setFormData({ ...formData, woreda: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kebele" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kebele</Label>
                <Input
                  id="kebele"
                  placeholder="E.G. KEBELE 12"
                  className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 uppercase font-bold text-xs h-12 bg-slate-50/50"
                  value={formData.kebele}
                  onChange={(e) => setFormData({ ...formData, kebele: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specific_location" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Specific Location</Label>
              <Input
                id="specific_location"
                placeholder="HOUSE NO, NEAR LANDMARK, ETC."
                className="rounded-none border-2 border-slate-200 focus:border-primary focus:ring-0 uppercase font-bold text-xs h-12 bg-slate-50/50"
                value={formData.specific_location}
                onChange={(e) => setFormData({ ...formData, specific_location: e.target.value })}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto h-14 px-12 bg-slate-900 text-white hover:bg-primary rounded-none font-black uppercase tracking-widest text-[11px] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isEdit ? "Update Job" : "Post Job Now"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <JobPaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        jobData={pendingJobData}
      />
    </>
  );
}
