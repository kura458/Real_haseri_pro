import { AdminLoginForm } from "@/src/features/auth/admin/components/AdminLoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Haseri",
  description: "Secure administrative access for Haseri platform",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
