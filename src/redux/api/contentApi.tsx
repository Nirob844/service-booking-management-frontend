import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const CONTENT_URL = "/blogs";

export const contentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    contents: build.query({
      query: () => {
        return {
          url: CONTENT_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.category],
    }),

    content: build.query({
      query: (id) => ({
        url: `${CONTENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    addContent: build.mutation({
      query: (Data) => ({
        url: CONTENT_URL,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    updateContent: build.mutation({
      query: (data) => ({
        url: `${CONTENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    deleteContent: build.mutation({
      query: (id) => ({
        url: `${CONTENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useContentsQuery,
  useContentQuery,
  useAddContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = contentApi;
