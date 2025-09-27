import { CategoryType } from "@/types/category";
import { apiSlice } from "../apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCategory: builder.query<
      { msg: string; categories: CategoryType[]; },
      void
    >({
      query: () => "/category",
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation<
      { newCategory: CategoryType; msg: string }, // response from backend
      { categoryName: string; description: string } // argument pass to backend
    >({
      query: ({ categoryName, description }) => ({
        url: "/category",
        method: "POST",
        body: { categoryName, description },
      }),
      invalidatesTags: ["Category"],
    }),

    toggleCategoryStatus: builder.mutation<
      { msg: string; updatedCategory: CategoryType },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/category/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<{ msg: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    editCategory: builder.mutation<
      { updatedCategory: CategoryType; msg: string },
      { id: string; categoryName: string; description: string }
    >({
      query: ({ id, categoryName, description }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: { categoryName, description },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useToggleCategoryStatusMutation,
} = categoryApiSlice;
