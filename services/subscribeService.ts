import { SubscriptionType } from "@/types/subscription";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "";

const axiosInstance = axios.create({ baseURL });

export const subscribeService = {
  subscribe: async (email: string): Promise<{ msg: string }> => {
    const response = await axiosInstance.post(`/api/subscribe/`, { email });
    return response.data;
  },
  // fetchAllSubscribe: async (): Promise<SubscriptionType[]> => {
  //   const response = await axiosInstance.get("/api/subscribe");
  //   return response.data.subscription;
  // },
  // deleteSubscribe: async (id: string): Promise<{ msg: string }> => {
  //   const response = await axiosInstance.delete(`/api/subscribe/${id}`);
  //   return response.data;
  // },
  // toggleSubscribeStatus: async (id: string) => {
  //   const response = await axiosInstance.patch(`/api/subscribe/${id}`);
  //   return response.data;
  // },
};
