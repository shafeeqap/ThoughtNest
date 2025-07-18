import { BlogItemType } from "@/types/blog";
import axios from "axios";


const baseURL =
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

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
};
