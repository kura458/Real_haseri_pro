import { z } from "zod";
export const phoneSchema = z
  .string()
  .regex(/^(\+251|0)[97]\d{8}$/, "Invalid Ethiopian phone number")
  .optional()
  .or(z.literal(""));