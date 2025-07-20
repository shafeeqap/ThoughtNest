import { blogSchema } from "@/lib/validators/zodSchema";

export const validateBlog = (
  title: string,
  description: string,
  image: File | null
) => {
  const result = blogSchema.safeParse({ title, description, image });

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    });

    return errors;
  }

  return null;
};
