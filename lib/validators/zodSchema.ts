import { z } from "zod";

export const zodSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Email is required." }),
});

export type EmailInput = z.infer<typeof zodSchema>;
