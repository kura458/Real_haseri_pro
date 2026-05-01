import { RegisterForm } from "@/src/features/auth/user/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register as Provider | Haseri",
  description: "Join Haseri as a provider to offer your services",
};

export default function RegisterProviderPage() {
  return <RegisterForm role="provider" />;
}
