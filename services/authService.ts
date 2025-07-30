import { SignUpFormData } from "@/types/auth";
import axios, { AxiosError } from "axios";

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
      const axiosError = error as AxiosError<{ msg: string }>;
      if (axiosError.response && axiosError.response.data?.msg) {
        return { msg: axiosError.response.data.msg };
      }
      return { msg: "Something went wrong. Please try again." };
    }
  },
};
