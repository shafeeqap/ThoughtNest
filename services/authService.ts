import { SignUpFormData } from "@/types/auth";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

const axiosInstance = axios.create({ baseURL });

export const authService = {
  signUp: async ({
    username,
    email,
    password,
  }: SignUpFormData): Promise<{ msg: string }> => {
    try {
      const response = await axiosInstance.post(`/api/signup/`, {
        username,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.msg || "Signup failed");
      }
      throw new Error("Signup failed");
    }
  },
  login: async (email: string, password: string): Promise<{ msg: string }> => {
    try {
      const response = await axiosInstance.post(`/api/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.msg || "Login failed");
      }
      throw new Error("Login failed");
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post("/api/logout");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Logout failed";
        throw new Error(message);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred during logout.");
      }
    }
  },
};
