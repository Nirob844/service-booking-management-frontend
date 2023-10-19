import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedbacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    feedbacks: build.query({
      query: () => {
        return {
          url: FEEDBACK_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.feedback],
    }),

    addFeedback: build.mutation({
      query: (Data) => ({
        url: FEEDBACK_URL,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useFeedbacksQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
