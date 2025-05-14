import { WordExpansionData } from "@/components/pages/learning/practice/others/word-expansion/lib/wordData";
import axiosBaseQuery from "./customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

interface IWordExpansion {
  word: string;
}

export const wordExpansionApi = createApi({
  reducerPath: "wordExpansionApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["History"],
  endpoints: (builder) => ({
    expandWord: builder.mutation<WordExpansionData, IWordExpansion>({
      query: (data: IWordExpansion) => {
        return {
          url: "/word-expansion",
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["History"],
    }),
    getHistory: builder.query<WordExpansionData, void>({
      query: () => ({
        url: `/word-expansion/history`,
        method: "GET",
      }),
      providesTags: ["History"],
    }),
    deleteHistory: builder.mutation<void, IWordExpansion>({
      query: (data: IWordExpansion) => ({
        url: `/word-expansion/history`,
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["History"],
    }),
  }),
});

export const {
  useExpandWordMutation,
  useGetHistoryQuery,
  useDeleteHistoryMutation,
} = wordExpansionApi;
