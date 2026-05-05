// This is the admin login page for the Haseri platform. It provides a secure interface for administrators to log in and manage the platform's settings and user accounts.
import { AdminLoginForm } from "@/src/features/auth/admin/components/AdminLoginForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Admin Portal | Haseri",
  description: "Secure administrative access for Haseri platform",
};
export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
