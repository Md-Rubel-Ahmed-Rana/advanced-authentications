import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name cannot exceed 80 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password cannot exceed 30 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "Password must contain at least one letter and one number",
      ),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please provide a valid email address"),

    password: z.string().min(1, "Password is required"),
  })
  .strict();

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
