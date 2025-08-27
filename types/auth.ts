import { type JWTPayload } from "jose";

type UserRole = "admin" | "user" | "author";

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

export interface TokenPayload extends JWTPayload {
  userId: string;
  role?: UserRole;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: string;
}

export interface LoginResponse {
  msg: string;
  user: User;
}