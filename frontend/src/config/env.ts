import { parseFrontendPublicEnv } from "../utils/validators/env.validator";
const parsedEnv = parseFrontendPublicEnv(process.env);
const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, "");
const appUrl = trimTrailingSlash(parsedEnv.NEXT_PUBLIC_APP_URL);
const backendOrigin = trimTrailingSlash(parsedEnv.NEXT_PUBLIC_BACKEND_ORIGIN);
const apiPrefix = parsedEnv.NEXT_PUBLIC_API_PREFIX.replace(/\/+$/, "");
export const env = {
  APP_URL: appUrl,
  BACKEND_ORIGIN: backendOrigin,
  API_PREFIX: apiPrefix,
  API_BASE_URL: `${backendOrigin}${apiPrefix}`,
  API_TIMEOUT_MS: parsedEnv.NEXT_PUBLIC_API_TIMEOUT_MS,
  GOOGLE_CLIENT_ID: parsedEnv.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  APP_NAME: parsedEnv.NEXT_PUBLIC_APP_NAME,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
} as const;

export type FrontendEnv = typeof env;