import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const REVIEW_RATING_URL = "/review-and-rating";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    reviewAndRatings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: REVIEW_RATING_URL,
          method: "GET",
          params: arg,
        };
      },
      //   transformResponse: (response: any[], meta: IMeta) => {
      //     return {
      //         reviewAndRatings: response,
      //       meta,
      //     };
      //   },
      providesTags: [tagTypes.reviewAndRating],
    }),

    reviewAndRatingServiceId: build.query({
      query: (id) => ({
        url: `${REVIEW_RATING_URL}/${id}/reviews`,
        method: "GET",
      }),
      providesTags: [tagTypes.reviewAndRating],
    }),

    reviewAndRating: build.query({
      query: (id) => ({
        url: `${REVIEW_RATING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reviewAndRating],
    }),

    addReviewAndRating: build.mutation({
      query: (Data) => ({
        url: `${REVIEW_RATING_URL}/review`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.reviewAndRating],
    }),

    updateReviewAndRating: build.mutation({
      query: (data) => ({
        url: `${REVIEW_RATING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.reviewAndRating],
    }),

    deleteReviewAndRating: build.mutation({
      query: (id) => ({
        url: `${REVIEW_RATING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reviewAndRating],
    }),
  }),
});

export const {
  useReviewAndRatingsQuery,
  useReviewAndRatingQuery,
  useReviewAndRatingServiceIdQuery,
  useAddReviewAndRatingMutation,
  useUpdateReviewAndRatingMutation,
  useDeleteReviewAndRatingMutation,
} = serviceApi;
