import { CreateUserDto, LogInDto } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./customBaseQuery";

const baseUrl = "auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Authentication"],
  endpoints: (builder) => ({
    logIn: builder.mutation<any, LogInDto>({
      query: (credentials) => ({
        url: `${baseUrl}/login`,
        method: "POST",
        data: credentials,
        invalidatesTags: ["Authentication"],
      }),
    }),
  }),
});

// Export hooks for use in components
export const { useLogInMutation } = authApi;
