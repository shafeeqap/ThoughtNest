import { SubscriptionType } from "@/types/subscription";
import { apiSlice } from "../apiSlice";

export const subscribeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<{ msg: string }, { email: string }>({
      query: ({ email }) => ({
        url: "/subscribe",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["Subscription"],
    }),

    fetchAllSubscribe: builder.query<
      { subscription: SubscriptionType[] },
      void
    >({
      query: () => "/subscribe",
      providesTags: ["Subscription"],
    }),

    deleteSubscribe: builder.mutation<{ msg: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/subscribe/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),

    toggleSubscribeStatus: builder.mutation<{ msg: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/subscribe/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubscribeMutation,
  useDeleteSubscribeMutation,
  useFetchAllSubscribeQuery,
  useToggleSubscribeStatusMutation,
} = subscribeApiSlice;
