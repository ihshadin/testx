import { TQueryParam } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }

        return {
          url: "/user",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),

    getRolesUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }

        return {
          url: "/user/roles",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),

    getUser: builder.query({
      query: () => {
        return {
          url: `/user/me`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),

    updateMe: builder.mutation({
      query: (data) => {
        return {
          url: `/user/me/`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),

    updateUser: builder.mutation({
      query: (data) => {
        // console.log("data from update user---=>", data);

        return {
          url: `/user/${data?.id}`,
          method: "PATCH",
          body: JSON.stringify(data?.data),
        };
      },
      invalidatesTags: ["user"],
    }),

    addNewUser: builder.mutation({
      query: (data) => {
        return {
          url: `/user`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetRolesUserQuery,
  useGetUserQuery,
  useUpdateMeMutation,
  useUpdateUserMutation,
  useAddNewUserMutation,
  useDeleteUserMutation,
} = userApi;
