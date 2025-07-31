import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "User name is required." })
      .min(3, { message: "User name must be at least 3 characters" })
      .refine((val) => !/^([a-zA-Z0-9])\1+$/.test(val), {
        message: "User name cannot contain repeated same character",
      })
      .refine((val) => !/\s{2,}/.test(val), {
        message: "User name cannot contain multiple consecutive spaces",
      }),
    email: z
      .string()
      .trim()
      // .min(1, { message: "Email is required." })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(5, { message: "Password must be at least 5 characters" })
      .regex(/^[^\s]*$/, { message: "Password must not contain spaces" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
