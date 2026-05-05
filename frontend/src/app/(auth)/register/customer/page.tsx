// Task: HAS-10 As a Customer or Technician, I want to create an account so that I can access the platform and use services.
import { redirect } from "next/navigation";

export default function RegisterCustomerPage() {
  redirect("/register");
}
