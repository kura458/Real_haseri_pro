import { LoginForm } from "@/src/features/auth/user/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Haseri",
  description: "Login to your Haseri account",
};

export default function LoginPage() {
  return <LoginForm />;
}
