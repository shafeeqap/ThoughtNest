import { categorySchema } from "../schema/categorySchema";

type FieldErrors = {
  categoryName?: string;
  description?: string;
};
export const validateCategory = (categoryName: string, description: string) => {
  const result = categorySchema.safeParse({ categoryName, description });

  if (!result.success) {
    const errors: FieldErrors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (
        typeof field === "string" &&
        ["categoryName", "description"].includes(field)
      ) {
        const typedField = field as keyof FieldErrors;
        if (!errors[typedField]) {
          errors[typedField] = issue.message;
        }
      }
    });

    return errors;
  }

  return null;
};
