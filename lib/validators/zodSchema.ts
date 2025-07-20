import { z } from "zod";

// 2MB limit
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const zodSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

export type EmailInput = z.infer<typeof zodSchema>;

// Function to strip HTML and check content for rich text
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

  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Image is required",
    })
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: "Image size must be less than 2MB",
    })
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
    }),
});
