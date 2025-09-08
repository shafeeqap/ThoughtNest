import { BlogItemType } from "@/types/blog";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

const axiosInstance = axios.create({ baseURL });

export const blogService = {
  addBlog: async (formData: FormData) => {
    const response = await axiosInstance.post("/api/blog", formData);
    return response.data;
  },
  fetchAllBlog: async (): Promise<BlogItemType[]> => {
    const response = await axiosInstance.get("/api/blog");
    return response.data.blogs;
  },
  fetchBlogById: async (id: string): Promise<BlogItemType> => {
    const response = await axiosInstance.get(`/api/blog/${id}`);
    return response.data;
  },
  deleteBlog: async (id: string): Promise<{ msg: string }> => {
    const response = await axiosInstance.delete(`/api/blog/${id}`);
    return response.data;
  },
  getBlogsByCategory: async (category: string): Promise<BlogItemType[]> => {
    const response = await axiosInstance.get(`/api/blog?category=${category}`);
    return response.data.blogs;
  },
  updateBlog: async (
    id: string,
    updates: { status?: string; action?: string }
  ) => {
    const response = await axiosInstance.patch(`/api/blog/${id}`, updates);
    return response.data;
  },
  editBlog: async (
    id: string,
    formData: FormData
  ): Promise<{ updatedBlog: BlogItemType; msg: string }> => {
    try {
      const response = await axiosInstance.put(`/api/blog/${id}`, formData);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.msg || "Failed to update blog";
        throw new Error(message);
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred during blog update.");
      }
    }
  },
};
