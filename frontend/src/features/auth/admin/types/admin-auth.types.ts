export type AdminLoginInput = {
  email: string;
  password: string;
};

export type AdminOtpInput = {
  admin_id: string;
  code: string;
};