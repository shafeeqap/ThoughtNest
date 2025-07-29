import { signUpFormSchema } from "@/lib/validators/signUpFormSchema";

export const validateSignUpForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const result = signUpFormSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });

  if (!result.success) {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (typeof field !== "string") return;

      if (field === "username") {
        errors.username = issue.message;
      }

      if (field === "email") {
        errors.email = issue.message;
      }

      if (field === "password") {
        errors.password = issue.message;
      }

      if (field === "confirmPassword") {
        errors.confirmPassword = issue.message;
      }

    });

    return errors;
  }

  return null;
};
