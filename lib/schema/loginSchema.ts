import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required." })
    .min(5, { message: "Password must be at least 5 characters" })
    .regex(/^[^\s]*$/, { message: "Password must not contain spaces" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    }),
});
