import { z } from "zod";
const frontendPublicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().trim().url().default("http://localhost:3000"),
  NEXT_PUBLIC_BACKEND_ORIGIN: z.string().trim().url().default("http://localhost:8000"),
  NEXT_PUBLIC_API_PREFIX: z
    .string()
    .trim()
    .default("/api")
    .transform((value) => (value.startsWith("/") ? value : `/${value}`)),
  NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce.number().int().positive().default(15000),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().trim().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().trim().default("Haseri"),
});
export const parseFrontendPublicEnv = (envSource: NodeJS.ProcessEnv) => {
  const parsed = frontendPublicEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: envSource.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BACKEND_ORIGIN: envSource.NEXT_PUBLIC_BACKEND_ORIGIN,
    NEXT_PUBLIC_API_PREFIX: envSource.NEXT_PUBLIC_API_PREFIX,
    NEXT_PUBLIC_API_TIMEOUT_MS: envSource.NEXT_PUBLIC_API_TIMEOUT_MS,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: envSource.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_APP_NAME: envSource.NEXT_PUBLIC_APP_NAME,
  });

  if (!parsed.success) {
    throw new Error(`Invalid environment: ${parsed.error.message}`);
  }

  return parsed.data;
};