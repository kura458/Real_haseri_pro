import React from "react";
import { AdminLayout } from "@/src/features/admin/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Haseri",
  description: "Haseri platform admin dashboard",
};

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
