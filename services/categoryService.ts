import { CategoryType } from "@/types/category";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

const axiosInstance = axios.create({ baseURL });

export const categoryService = {
  addCategory: async (
    categoryName: string,
    description: string
  ): Promise<{ newCategory: CategoryType; msg: string }> => {
    const response = await axiosInstance.post("/api/category", {
      categoryName,
      description,
    });
    return response.data;
  },
  fetchCategory: async () => {
    const response = await axiosInstance.get("/api/category");
    return response.data.category;
  },
  toggleCategoryStatus: async (id: string) => {
    const response = await axiosInstance.patch(`/api/category/${id}`);
    return response.data;
  },
};
