import { IMeta } from "@/types";
import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    bookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BOOKING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [tagTypes.bookings],
    }),

    booking: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bookings],
    }),

    addBooking: build.mutation({
      query: (Data) => ({
        url: `${BOOKING_URL}/create-booking`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.bookings],
    }),

    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bookings],
    }),
  }),
});

export const {
  useBookingsQuery,
  useBookingQuery,
  useAddBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
