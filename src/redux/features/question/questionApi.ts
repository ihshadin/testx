import { TQueryParam } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestion: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }
        return {
          url: "/question",
          method: "GET",
          params,
        };
      },

      providesTags: ["question"],
    }),

    getSingleQuestion: builder.query({
      query: (id) => {
        return {
          url: `/question/${id}`,
          method: "GET",
        };
      },
    }),

    addQuestion: builder.mutation({
      query: (data) => {
        return {
          url: "/question",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["question"],
    }),

    deleteQuestion: builder.mutation({
      query: (id) => {
        return {
          url: `/question/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["question"],
    }),

    updateQuestion: builder.mutation({
      query: (args) => {
        return {
          url: `/question/${args?.id}`,
          method: "PATCH",
          body: args?.data,
        };
      },
      invalidatesTags: ["question"],
    }),

    updateQuestions: builder.mutation({
      query: (args) => {
        return {
          url: "/question",
          method: "PATCH",
          body: args,
        };
      },

      invalidatesTags: ["question"],
    }),

    deleteImage: builder.mutation({
      query: (args) => {
        return {
          url: `/question/image/${args?.id}`,
          method: "DELETE",
          body: args?.url,
        };
      },
      invalidatesTags: ["question"],
    }),
  }),
});

export const {
  useGetAllQuestionQuery,
  useGetSingleQuestionQuery,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
  useUpdateQuestionsMutation,
  useDeleteImageMutation,
} = questionApi;
