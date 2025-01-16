import { TQueryParam } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params?.append(item.name, item.value as string);
          });
        }
        return {
          url: "/course",
          method: "GET",
          params,
        };
      },

      providesTags: ["course"],
    }),

    addCourse: builder.mutation({
      query: (data) => {
        return {
          url: "/course",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["course"],
    }),

    updateCourse: builder.mutation({
      query: (args) => {
        return {
          url: `/course/${args?.id}`,
          method: "PATCH",
          body: args?.data,
        };
      },
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllCourseQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
