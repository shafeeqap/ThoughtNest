import { type JWTPayload } from "jose";

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormData {
  email: string;
  password: string;
}

type UserRole = "admin" | "user" | "author";

export interface TokenPayload extends JWTPayload {
  userId: string;
  role?: UserRole;
}
