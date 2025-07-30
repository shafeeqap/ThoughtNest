import { signUpFormSchema } from "@/lib/schema/signUpFormSchema";

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
  const result = signUpFormSchema.safeParse({
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

      // if (field === "username") {
      //   errors.username = issue.message;
      // }

      // if (field === "email") {
      //   errors.email = issue.code;
      // }

      // if (field === "password") {
      //   const requiredError = result.error.issues.find(
      //     (issue) => issue.code === "too_small"
      //   );
      //   if (requiredError) {
      //     errors.password = requiredError.message;
      //   } else {
      //     const invalidFormatError = result.error.issues.find(
      //       (issue) => issue.code === "too_big"
      //     );
      //     errors.password = invalidFormatError?.message;
      //   }
      // }

      // if (field === "confirmPassword") {
      //   errors.confirmPassword = issue.message;
      // }
    });

    return errors;
  }

  return null;
};
