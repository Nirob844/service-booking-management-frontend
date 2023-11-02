import { tagTypes } from "../teg-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userRegistration: build.mutation({
      query: (registrationData) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: registrationData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: build.mutation({
      query: (passwordData) => ({
        url: `${AUTH_URL}/change-password`,
        method: "POST",
        data: passwordData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegistrationMutation,
  useChangePasswordMutation,
} = authApi;
