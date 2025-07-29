import { z } from "zod";

export const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "User name must be at least 3 characters" })
      .refine((val) => val.trim().length > 0, {
        message: "User name cannot be empty or just spaces",
      }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" })
      .refine((val) => val.trim().length > 0, {
        message: "Password cannot be empty or just spaces",
      })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().refine((val) => val.trim().length > 0, {
      message: "Password cannot be empty or just spaces",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
