import { apiSlice } from "@/redux";

const twoFaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setup2fa: builder.mutation({
      query: () => ({
        url: `/auth/2fa/setup`,
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    verify2fa: builder.mutation({
      query: ({ token }: { token: string }) => ({
        url: `/auth/2fa/verify`,
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["auth"],
    }),
    verify2faLogin: builder.mutation({
      query: ({ code }: { code: string }) => ({
        url: `/auth/2fa/login`,
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["auth"],
    }),
    verifyRecoveryCode: builder.mutation({
      query: ({ code }: { code: string }) => ({
        url: `/auth/2fa/login/code`,
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useSetup2faMutation,
  useVerify2faMutation,
  useVerify2faLoginMutation,
  useVerifyRecoveryCodeMutation,
} = twoFaApi;
