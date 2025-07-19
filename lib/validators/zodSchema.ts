import { z } from "zod";

export const zodSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

export type EmailInput = z.infer<typeof zodSchema>;

// Custom function to strip HTML and check content for rich text
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .refine((val) => val.trim().length > 0, {
      message: "Title cannot be empty or just spaces",
    }),

  description: z.string().refine((val) => stripHtml(val).length > 10, {
    message: "Content must contain at least 10 meaningful characters",
  }),
});
