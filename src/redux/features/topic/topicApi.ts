import { TQueryParam } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const topicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTopic: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }
        return {
          url: "/topic",
          method: "GET",
          params,
        };
      },

      providesTags: ["topic"],
    }),

    addTopic: builder.mutation({
      query: (data) => {
        return {
          url: "/topic",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["topic"],
    }),

    deleteTopic: builder.mutation({
      query: (id) => {
        return {
          url: `/topic/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["topic"],
    }),

    updateTopic: builder.mutation({
      query: (args) => {
        return {
          url: `/topic/${args?.id}`,
          method: "PATCH",
          body: args?.data,
        };
      },
      invalidatesTags: ["topic"],
    }),
  }),
});

export const {
  useGetAllTopicQuery,
  useAddTopicMutation,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
} = topicApi;
