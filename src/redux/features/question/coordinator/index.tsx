import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global.type";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }
        return {
          url: "/question/coordinator",
          method: "GET",
          params,
        };
      },

      providesTags: ["question"],
    }),
  }),
});

export const { useGetQuestionsQuery } = questionApi;
