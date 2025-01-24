import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/user/auth/logout",
          method: "POST",
        };
      },
    }),
    userRegisterRequest: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (args) => {
        return {
          url: "/user/auth/generate-reset-code",
          method: "POST",
          body: args,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (args) => {
        return {
          url: "/user/auth/change-password",
          method: "POST",
          body: args,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useUserRegisterRequestMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
