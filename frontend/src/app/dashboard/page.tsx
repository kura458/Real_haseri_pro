"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { LoadingSpinner } from "@/src/features/shared/components";

export default function DashboardRedirectPage() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAdmin) {
      router.push("/admin/dashboard");
      return;
    }

    // Role-based redirection
    if (user?.role === "customer") {
      router.push("/customer/profile");
    } else if (user?.role === "provider") {
      router.push("/technician/profile");
    } else {
      router.push("/");
    }
  }, [user, isAuthenticated, isAdmin, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <LoadingSpinner size="lg" label="Redirecting to your dashboard..." />
      </div>
    </div>
  );
}
