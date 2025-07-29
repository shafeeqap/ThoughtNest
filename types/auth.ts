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
