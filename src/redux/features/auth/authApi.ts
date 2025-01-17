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
    userRegisterRequest: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/user/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useUserRegisterRequestMutation,
  useChangePasswordMutation,
} = authApi;
