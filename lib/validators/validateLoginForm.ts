import { loginSchema } from "../schema/loginSchema";

type FieldErrors = {
  email?: string;
  password?: string;
};

export const validateLoginForm = (
  email: string,
  password: string
): FieldErrors | null => {
  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    const errors: { email?: string; password?: string } = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string" && ["email", "password"].includes(field)) {
        const typedField = field as keyof FieldErrors;
        if (!errors[typedField]) errors[typedField] = issue.message;
      }
    });

    return errors;
  }
  return null;
};
