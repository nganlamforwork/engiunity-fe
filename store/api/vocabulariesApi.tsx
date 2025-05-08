import axiosBaseQuery from "./customBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

interface ICreateSession {
  userId: number;
}

export const vocabulariesApi = createApi({
  reducerPath: "vocabulariesApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: (data: ICreateSession) => {
        return {
          url: "/vocabulary/create-session",
          method: "POST",
          data,
        };
      },
    }),
    getAllSessions: builder.query({
      query: (userId) => ({
        url: `/vocabulary/get-sessions`,
        method: "GET",
        params: { userId },
      }),
    }),
    getAllVocabularies: builder.query({
      query: (userId) => ({
        url: `/vocabulary/get-vocabularies`,
        method: "GET",
        params: { userId },
      }),
    }),
    generateVocabularyWords: builder.mutation({
      query: (data) => ({
        url: "/vocabulary/vocabulary-hunt",
        method: "POST",
        data,
      }),
    }),
    generateParagraph: builder.mutation({
      query: (data) => ({
        url: "/vocabulary/paragraph-generate",
        method: "POST",
        data,
      }),
    }),
    completeReading: builder.mutation({
      query: (data) => ({
        url: "/vocabulary/reading-mode",
        method: "POST",
        data,
      }),
    }),
    generateFeedback: builder.mutation({
      query: (data) => ({
        url: "/vocabulary/feedback-generate",
        method: "POST",
        data,
      }),
    }),
    getSessionDetail: builder.query({
      query: ({ sessionId }) => ({
        url: "/vocabulary/session",
        method: "GET",
        params: { sessionId },
      }),
    }),
  }),
});

export const {
  useCreateSessionMutation,
  useGetAllSessionsQuery,
  useGetAllVocabulariesQuery,
  useGenerateVocabularyWordsMutation,
  useGenerateParagraphMutation,
  useCompleteReadingMutation,
  useGenerateFeedbackMutation,
  useGetSessionDetailQuery,
} = vocabulariesApi;
