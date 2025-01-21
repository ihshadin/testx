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
  useLogoutMutation,
  useUserRegisterRequestMutation,
  useChangePasswordMutation,
} = authApi;
