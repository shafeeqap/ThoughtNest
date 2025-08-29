import { signUpSchema } from "@/lib/schema/signUpSchema";

type FieldErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const validateSignUpForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): FieldErrors | null => {
  const result = signUpSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });


  if (!result.success) {

    const errors: FieldErrors = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (
        typeof field === "string" &&
        ["username", "email", "password", "confirmPassword"].includes(field)
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
