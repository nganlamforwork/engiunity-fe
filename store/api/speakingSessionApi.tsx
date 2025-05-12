import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./customBaseQuery";
import { CreateExerciseDto } from "@/types/WritingExercise";
import {
  CreateSpeakingSessionDto,
  SpeakingQuestion,
  SpeakingSession,
  GradingResult,
} from "@/types/Speaking";

const baseUrl = "speaking/sessions";

export const speakingSessionApi = createApi({
  reducerPath: "speakingSessionApi",
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Speaking Session"],
  endpoints: (builder) => ({
    createSpeakingSession: builder.mutation<
      SpeakingSession,
      CreateSpeakingSessionDto
    >({
      query: (formData) => {
        return {
          url: `${baseUrl}`,
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: ["Speaking Session"],
    }),
    getSpeakingSession: builder.query<SpeakingSession, { id: number }>({
      query: ({ id }) => {
        return {
          url: `${baseUrl}/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Speaking Session"],
    }),
    getQuestions: builder.query<
      SpeakingQuestion[],
      {
        sessionId: number;
        order?: number;
        part?: string;
        questionId?: number;
      }
    >({
      query: ({ sessionId, order, part, questionId }) => {
        const params = new URLSearchParams();
        if (order !== undefined) params.append("order", order.toString());
        if (part) params.append("part", part);
        if (questionId !== undefined)
          params.append("questionId", questionId.toString());

        return {
          url: `${baseUrl}/${sessionId}/questions?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Speaking Session"],
    }),
    updateSessionAnswers: builder.mutation<
      void,
      { sessionId: number; answers: Record<string, string> }
    >({
      query: ({ sessionId, answers }) => {
        return {
          url: `${baseUrl}/${sessionId}/response`,
          method: "PATCH",
          data: { answers },
        };
      },
      invalidatesTags: ["Speaking Session"],
    }),
    submitSession: builder.mutation<GradingResult, { sessionId: number }>({
      query: ({ sessionId }) => {
        return {
          url: `${baseUrl}/${sessionId}/submit`,
          method: "POST",
        };
      },
      invalidatesTags: ["Speaking Session"],
    }),
  }),
});

export const {
  useCreateSpeakingSessionMutation,
  useGetSpeakingSessionQuery,
  useGetQuestionsQuery,
  useUpdateSessionAnswersMutation,
  useSubmitSessionMutation,
} = speakingSessionApi;
