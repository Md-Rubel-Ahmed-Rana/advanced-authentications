import z from "zod";

export const verifyAuthenticatorSchema = z.object({
  body: z.object({
    token: z
      .string({
        required_error: "Verification code is required",
      })
      .regex(/^\d{6}$/, "Verification code must be 6 digits"),
  }),
});
