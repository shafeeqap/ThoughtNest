import { zodSchema } from "@/lib/validators/zodSchema";

export const validateEmail = (email: string) => {
  const result = zodSchema.safeParse({ email });

  if (!result.success) {
    const requiredError = result.error.issues.find((issue) => issue.code === "too_small");
    if (requiredError) {
      return requiredError.message;
    } else {
      const invalidFormatError = result.error.issues.find((issue) => issue.code === "invalid_format");
      return invalidFormatError?.message;
    }
  }
};
