import { blogSchema } from "@/lib/validators/zodSchema";

export const validateBlog = (
  title: string,
  description: string,
  image: File | null
) => {
  const result = blogSchema.safeParse({ title, description, image });

  if (!result.success) {
    const errors: { title?: string; description?: string; image?: string[] } = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field !== "string") return;

      if (field === "title") {
        errors.title = issue.message;
      }

      if (field === "description") {
        errors.description = issue.message;
      }

      if (field === "image" && !errors.image) {
        if (!errors.image) {
          errors.image = [];
        }
        errors.image.push(issue.message)
      }
    });

    return errors;
  }

  return null;
};
