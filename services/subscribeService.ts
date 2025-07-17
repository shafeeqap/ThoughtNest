import axios from "axios";

export const subscribeService = {
  subscribe: async (email: string): Promise<{ msg: string }> => {
    const response = await axios.post(`/api/subscribe/`, { email });
    return response.data;
  },
};
