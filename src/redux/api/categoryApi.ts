import { IMeta } from "@/types";
import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const CATEGORY_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    categories: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          categories: response,
          meta,
        };
      },
      providesTags: [tagTypes.category],
    }),

    category: build.query({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    addCategory: build.mutation({
      query: (Data) => ({
        url: `${CATEGORY_URL}/create-category`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    updateCategory: build.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
