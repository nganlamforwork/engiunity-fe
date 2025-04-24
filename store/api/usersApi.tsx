import { CreateUserDto } from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./customBaseQuery";

const baseUrl = "users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getProfile: builder.query<any, null>({
      query: () => ({
        url: `${baseUrl}`,
        method: "GET",
      }),
      providesTags: (result) => ["Users"],
    }),
    signUp: builder.mutation<any, CreateUserDto>({
      query: (userData) => ({
        url: `${baseUrl}`,
        method: "POST",
        data: userData,
      }),
    }),
    updateProfile: builder.mutation<any, Partial<CreateUserDto>>({
      query: (data) => ({
        url: `${baseUrl}/update`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useSignUpMutation,
  useUpdateProfileMutation,
} = usersApi;
