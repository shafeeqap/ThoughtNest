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
    const response = await axiosInstance.post(`/api/signup/`, {
      username,
      email,
      password,
    });
    return response.data;
  },
};
