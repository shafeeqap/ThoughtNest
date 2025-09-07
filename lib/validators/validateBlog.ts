import { blogSchema } from "@/lib/schema/zodSchema";

export const validateBlog = (
  title: string,
  description: string,
  image: File | null | string,
) => {
  const result = blogSchema.safeParse({ title, description, image });

  console.log(image, 'Image...');
  
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
