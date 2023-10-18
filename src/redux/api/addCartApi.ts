import { IMeta } from "@/types";
import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const CART_URL = "/add-carts";

export const addCartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCarts: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CART_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          carts: response,
          meta,
        };
      },
      providesTags: [tagTypes.addCartApi],
    }),

    addAddCart: build.mutation({
      query: (Data) => ({
        url: CART_URL,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.addCartApi],
    }),

    updateCart: build.mutation({
      query: (data) => ({
        url: `${CART_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.addCartApi],
    }),

    deleteCart: build.mutation({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.addCartApi],
    }),
  }),
});

export const {
  useAddCartsQuery,
  useAddAddCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} = addCartApi;
