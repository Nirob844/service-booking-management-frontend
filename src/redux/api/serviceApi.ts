import { IMeta } from "@/types";
import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.service],
    }),

    service: build.query({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    addService: build.mutation({
      query: (Data) => ({
        url: `${SERVICE_URL}/create-service`,
        method: "POST",
        data: Data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useServicesQuery,
  useServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
