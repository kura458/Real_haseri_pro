import { RegisterForm } from "@/src/features/auth/user/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register as Customer | Haseri",
  description: "Join Haseri as a customer to hire experts",
};

export default function RegisterCustomerPage() {
  return <RegisterForm role="customer" />;
}
