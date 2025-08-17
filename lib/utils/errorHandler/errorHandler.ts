import { NextResponse } from "next/server";

export function handleError(error: unknown): NextResponse {
  let statusCode = 500;
  let errorMessage = "Internal server error";

  if (error instanceof Error) {
    switch (error.message) {
      case "ACCOUNT_NOT_FOUND":
        statusCode = 404;
        errorMessage = "Account not found";
        break;
      case "SOCIAL_ACCOUNT":
        statusCode = 400;
        errorMessage = "Please sign in with your social account";
        break;
      case "INVALID_PASSWORD":
        statusCode = 401;
        errorMessage = "Invalid password";
        break;
      case "ACCOUNT_LOCKED":
        statusCode = 403;
        errorMessage = "Account temporarily locked";
        break;
      default:
        errorMessage = error.message;
    }
  }
  console.error("Error:", error);
  return NextResponse.json({ msg: errorMessage }, { status: statusCode });
}
