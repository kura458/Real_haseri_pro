"use client";

import React from "react";
import { 
  ProfileCover, 
  ProfileHeader, 
  ProfileSidebar,
  ProfileAnalytics,
  ProfileEditableAside,
  ProfileJobsList,
  ProfileApplicationsPanel
} from "./";
import { Container, Section } from "@/src/features/shared/components";
import { Phone, MapPin, Shield } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { useCustomerProfile } from "@/src/features/customers/hooks/useCustomerProfile";
import { useJobs } from "@/src/features/jobs/hooks";
import { toast } from "react-hot-toast";

export function CustomerProfileDashboard() {
  const { user } = useAuth();
  const { update } = useCustomerProfile();
  const { jobs, loading: jobsLoading, getMyJobs } = useJobs();

  React.useEffect(() => {
    getMyJobs();
  }, [getMyJobs]);

  const handleSave = async (data: Record<string, string>) => {
    const result = await update(data);
    if (result) {
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Section padding="none" className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-6">
      <Container className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            <ProfileCover />
            <div className="flex-1 pb-6">
               <ProfileHeader />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
            <ProfileSidebar />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-10">
          <div className="space-y-8">
            <ProfileAnalytics 
              totalJobs={jobs.length} 
              activeJobs={jobs.filter(j => j.status === 'open').length} 
            />
            <ProfileJobsList jobs={jobs} loading={jobsLoading} />
            <ProfileApplicationsPanel jobs={jobs} />
          </div>
          <div className="space-y-6">
            <ProfileEditableAside
              title="Personal"
              icon={<Shield className="w-5 h-5" />}
              data={[
                { label: "First Name", name: "first_name", value: user?.first_name || "" },
                { label: "Last Name", name: "last_name", value: user?.last_name || "" },
              ]}
              onSave={handleSave}
            />
            <ProfileEditableAside
              title="Contact"
              icon={<Phone className="w-5 h-5" />}
              data={[
                { label: "Email Address", name: "email", value: user?.email || "", type: "email" },
                { label: "Phone Number", name: "phone", value: user?.phone || "", type: "tel" },
              ]}
              onSave={handleSave}
            />
            <ProfileEditableAside
              title="Address"
              icon={<MapPin className="w-5 h-5" />}
              displayData={[
                { label: "City", name: "city", value: (user as any)?.address?.city || (user as any)?.city || "" },
                { label: "Specific Location", name: "specific_location", value: (user as any)?.address?.specific_location || (user as any)?.specific_location || "" },
              ]}
              data={[
                { label: "City", name: "city", value: (user as any)?.address?.city || (user as any)?.city || "" },
                { label: "Sub City", name: "sub_city", value: (user as any)?.address?.sub_city || (user as any)?.sub_city || "" },
                { label: "Woreda", name: "woreda", value: (user as any)?.address?.woreda || (user as any)?.woreda || "" },
                { label: "Kebele", name: "kebele", value: (user as any)?.address?.kebele || (user as any)?.kebele || "" },
                { label: "Specific Location", name: "specific_location", value: (user as any)?.address?.specific_location || (user as any)?.specific_location || "" },
                { label: "Address Label", name: "label", value: (user as any)?.address?.label || "" },
              ]}
              onSave={handleSave}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
