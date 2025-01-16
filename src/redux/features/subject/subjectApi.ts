import { TQueryParam } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const subjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubject: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }
        return {
          url: "/subject",
          method: "GET",
          params,
        };
      },

      providesTags: ["subject"],
    }),

    addSubject: builder.mutation({
      query: (data) => {
        return {
          url: "/subject",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["subject"],
    }),

    deleteSubject: builder.mutation({
      query: (id) => {
        return {
          url: `/subject/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["subject"],
    }),

    updateSubject: builder.mutation({
      query: (args) => {
        return {
          url: `/subject/${args?.id}`,
          method: "PATCH",
          body: args?.data,
        };
      },
      invalidatesTags: ["subject"],
    }),
  }),
});

export const {
  useGetAllSubjectQuery,
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
} = subjectApi;
