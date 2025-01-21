import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useUpdateCoordinatorMutation } = userApi;
