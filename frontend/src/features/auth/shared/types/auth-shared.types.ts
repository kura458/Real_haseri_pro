export type UserRole = "customer" | "provider";
export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};