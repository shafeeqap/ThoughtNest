import { User } from "@/types/auth";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

const axiosInstance = axios.create({ baseURL });

export const userService = {
  getUsers: async (): Promise<User> => {
    const response = await axiosInstance.get("/api/user");
    return response.data.user;
  },
  toggleUserStatus: async (id: string) => {
    const response = await axiosInstance.patch(`/api/user/${id}`);
    return response.data;
  },
};
