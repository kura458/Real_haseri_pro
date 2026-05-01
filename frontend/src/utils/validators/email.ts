import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Invalid email format")
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format")
  .optional()
  .or(z.literal(""));