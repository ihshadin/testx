import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserInfo } from "@/utils/localStorage/localStorageAuthManagement";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  // baseUrl: "https://testx-admin.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getUserInfo();

    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["meta", "user", "course", "subject", "topic", "question"],
  refetchOnMountOrArgChange: 30,
  endpoints: () => ({}),
});
