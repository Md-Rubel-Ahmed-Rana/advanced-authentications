import { apiSlice } from "@/redux";
import {
  LoginFormValues,
  RegisterFormValues,
} from "@/app/validations/auth.validation";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterFormValues) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (data: LoginFormValues) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/auth`,
      }),
      providesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;
