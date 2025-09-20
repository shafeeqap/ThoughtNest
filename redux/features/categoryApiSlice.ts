import { CategoryType } from "@/types/category";
import { apiSlice } from "../apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategory: builder.query<{msg: string; category: CategoryType[] }, void>({
      query: () => "/category",
      providesTags: ["Category"],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchCategoryQuery } = categoryApiSlice;
