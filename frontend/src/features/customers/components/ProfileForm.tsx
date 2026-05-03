"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { useCustomerProfile } from "../hooks/useCustomerProfile";
import { FormField, Heading, Text } from "@/src/features/shared/components";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { User, Mail, Phone, Save, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export const ProfileForm = () => {
  const { user } = useAuth();
  const { update, loading } = useCustomerProfile();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: (user as any).address || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await update(formData);
    if (result) {
      toast.success("Profile updated successfully", {
        className: "rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-slate-900",
      });
    } else {
      toast.error("Failed to update profile", {
        className: "rounded-none font-black uppercase tracking-widest text-[10px] border-2 border-slate-900",
      });
    }
  };

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="First Name" required>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <User className="w-4 h-4" />
              </div>
              <Input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="rounded-none border-2 border-slate-200 h-14 pl-12 focus-visible:ring-0 focus-visible:border-slate-900 transition-all bg-white hover:border-slate-400 font-bold uppercase text-[11px] tracking-widest"
              />
            </div>
          </FormField>

          <FormField label="Last Name" required>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <User className="w-4 h-4" />
              </div>
              <Input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="rounded-none border-2 border-slate-200 h-14 pl-12 focus-visible:ring-0 focus-visible:border-slate-900 transition-all bg-white hover:border-slate-400 font-bold uppercase text-[11px] tracking-widest"
              />
            </div>
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Email Address" required>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="rounded-none border-2 border-slate-200 h-14 pl-12 focus-visible:ring-0 focus-visible:border-slate-900 transition-all bg-white hover:border-slate-400 font-bold uppercase text-[11px] tracking-widest"
              />
            </div>
          </FormField>

          <FormField label="Phone Number">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+251 ..."
                className="rounded-none border-2 border-slate-200 h-14 pl-12 focus-visible:ring-0 focus-visible:border-slate-900 transition-all bg-white hover:border-slate-400 font-bold uppercase text-[11px] tracking-widest"
              />
            </div>
          </FormField>
        </div>

        <FormField label="Full Address / Location" hint="City, Subcity, Woreda">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <User className="w-4 h-4" />
            </div>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Addis Ababa, Bole, Woreda 03"
              className="rounded-none border-2 border-slate-200 h-14 pl-12 focus-visible:ring-0 focus-visible:border-slate-900 transition-all bg-white hover:border-slate-400 font-bold uppercase text-[11px] tracking-widest"
            />
          </div>
        </FormField>

        <div className="pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.3em] text-xs transition-all active:scale-[0.98] shadow-xl shadow-slate-950/20"
          >
            {loading ? (
              <>
                <Loader2 className="mr-3 w-5 h-5 animate-spin" />
                UPDATING PROFILE...
              </>
            ) : (
              <>
                <Save className="mr-3 w-5 h-5" />
                UPDATE ACCOUNT
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
