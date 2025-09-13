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
  fetchCategory: async ():Promise <CategoryType[]> => {
    const response = await axiosInstance.get("/api/category");
    return response.data.category;
  },
  toggleCategoryStatus: async (id: string) => {
    const response = await axiosInstance.patch(`/api/category/${id}`);
    return response.data;
  },
  deleteCategory: async (id: string) => {
    const response = await axiosInstance.delete(`/api/category/${id}`);
    return response.data;
  },
  editCategory: async (
    id: string,
    categoryName: string,
    description: string
  ): Promise<{ updatedCategory: CategoryType; msg: string }> => {
    try {
      const response = await axiosInstance.put(`/api/category/${id}`, {
        categoryName,
        description,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverMsg =
          error.response?.data?.msg || "Failed to update category";
        throw new Error(serverMsg);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred during category update.");
      }
    }
  },
};
