import { z } from "zod";

// Phone validation: Saudi pattern ^(\+966|0)?5\d{8}$
const saudiPhoneRegex = /^(\+966|0)?5\d{8}$/;

export const maidSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  age: z.number().int().min(21).max(55),
  nationality: z.string().min(1, "Nationality is required"),
  etaDays: z.number().int().min(1).max(60),
  hasExperience: z.boolean(),
  yearsExperience: z.number().int().min(1).max(15).optional(),
  photos: z.array(z.string()).min(1, "At least one photo is required"),
  notes: z.string().optional(),
});

export const leadSchema = z.object({
  maidId: z.string().min(1, "Maid ID is required"),
  name: z.string().min(1, "Name is required").max(100),
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine(
      (phone) => {
        // Remove spaces, dashes, and parentheses for validation
        const cleaned = phone.replace(/[\s\-()]/g, "");
        return saudiPhoneRegex.test(cleaned);
      },
      {
        message:
          "Please enter a valid Saudi phone number (e.g., +966501234567 or 0501234567)",
      }
    ),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().max(1000).optional(),
});

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

// Helper to clean phone number
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[\s\-()]/g, "");
}

