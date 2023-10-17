import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const PROFILE_URL = "/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => ({
        url: PROFILE_URL,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: PROFILE_URL,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = profileApi;
