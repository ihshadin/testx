import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }

        return {
          url: "/user/coordinator",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    updateCoordinator: builder.mutation({
      query: (args) => {
        return {
          url: "/user/coordinator/assign",
          method: "PATCH",
          body: args,
        };
      },

      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetTeachersQuery, useUpdateCoordinatorMutation } = userApi;
