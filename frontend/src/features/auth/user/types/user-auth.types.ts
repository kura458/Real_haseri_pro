export type UserRole = "customer" | "provider";

export type LoginInput = {
  email?: string;
  phone?: string;
  password: string;
};

export type RegisterInput = {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
};

export type ForgotPasswordInput = {
  email?: string;
  phone?: string;
};

export type ResetPasswordInput = {
  user_id: string;
  new_password: string;
  new_password_confirmation: string;
};