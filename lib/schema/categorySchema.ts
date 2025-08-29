import { z } from "zod";

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

export const categorySchema = z.object({
    categoryName:z
    .string()
    .min(1, { message: "Category name is required." })
    .min(3, { message: "Category name must be at least 3 characters" })
    .refine((val) => !/^([a-zA-Z0-9])\1+$/.test(val), {
      message: "Category name cannot contain repeated same character",
    })
    .refine((val) => !/\s{2,}/.test(val), {
      message: "Category name cannot contain multiple consecutive spaces",
    }),
    description: z.string().refine((val) => stripHtml(val).length > 10, {
        message: "Content must contain at least 10 meaningful characters",
      }),
})