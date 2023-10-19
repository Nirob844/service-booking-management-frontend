import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const FAQ_URL = "/faqs";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    faqs: build.query({
      query: () => {
        return {
          url: FAQ_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.faq],
    }),

    faq: build.query({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    addFaq: build.mutation({
      query: (Data) => ({
        url: FAQ_URL,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    updateFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useFaqsQuery,
  useFaqQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = faqApi;
