import { baseApi } from "@/redux/api/baseApi";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateImage: builder.mutation({
      query: (args) => {
        return {
          url: `/question/image/${args?.id}`,
          method: "PATCH",
          body: args?.data,
        };
      },
      invalidatesTags: ["question"],
    }),

    deleteImage: builder.mutation({
      query: (args) => {
        return {
          url: `/question/image/${args?.id}`,
          method: "DELETE",
          body: args,
        };
      },
      invalidatesTags: ["question"],
    }),
  }),
});

export const { useUpdateImageMutation, useDeleteImageMutation } = questionApi;
