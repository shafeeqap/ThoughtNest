import { BlogItemType } from "@/types/blog";
import { apiSlice } from "../apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllBlog: builder.query<{ msg: string; blogs: BlogItemType[] }, void>({
      query: () => "/blog",
      providesTags: ["Blog"],
    }),

    addBlog: builder.mutation<
      { msg: string; success: boolean },
      { formData: FormData }
    >({
      query: ({ formData }) => ({
        url: "/blog",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlog: builder.mutation<
      { msg: string; updatedBlog: BlogItemType }, // response from backend
      { id: string; update: { status?: string; action?: string } } // argument pass to backend
    >({
      query: ({ id, update }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["Blog"],
    }),

    deleteBlog: builder.mutation<{ msg: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

    editBlog: builder.mutation<
      { msg: string; updatedBlog: BlogItemType },
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/blog/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Blog"],
    }),

    bulkUpdateBlog: builder.mutation<
      { msg: string; updatedBlog: BlogItemType[] },
      { ids: string[]; status: string }
    >({
      query: ({ ids, status }) => ({
        url: `/blog/bulk-update`,
        method: "PATCH",
        body: { ids, status },
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchAllBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
  useBulkUpdateBlogMutation,
} = blogApiSlice;
