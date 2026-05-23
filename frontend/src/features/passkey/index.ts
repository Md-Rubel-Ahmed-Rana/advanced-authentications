import { apiSlice } from "@/redux";

const passkeyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerPasskeyOptions: builder.mutation({
      query: () => ({
        url: `/auth/passkeys/register/options`,
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    loginPasskeyOptions: builder.mutation({
      query: () => ({
        url: `/auth/passkeys/login/options`,
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    registerPasskeyVerify: builder.mutation({
      query: (data: any) => ({
        url: `/auth/passkeys/register/verify`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    loginPasskeyVerify: builder.mutation({
      query: (data: any) => ({
        url: `/auth/passkeys/login/verify`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    removePasskey: builder.mutation({
      query: (id: string) => ({
        url: `/auth/passkeys/${id}/remove`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterPasskeyOptionsMutation,
  useRegisterPasskeyVerifyMutation,
  useLoginPasskeyOptionsMutation,
  useLoginPasskeyVerifyMutation,
  useRemovePasskeyMutation,
} = passkeyApi;
