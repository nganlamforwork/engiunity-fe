import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./customBaseQuery";
import { CreateExerciseDto } from "@/types/WritingExercise";
import {
  CreateSpeakingSessionDto,
  SpeakingQuestion,
  SpeakingSession,
  GradingResult,
  SpeakingResponse,
} from "@/types/Speaking";

const baseUrl = "speaking/sessions";

export const speakingSessionApi = createApi({
  reducerPath: "speakingSessionApi",
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: false,
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
    updateSessionResponses: builder.mutation<
      void,
      { sessionId: number; responses: Record<string, string> }
    >({
      query: ({ sessionId, responses }) => {
        // Convert from Record<string, string> to the format expected by the backend
        const formattedResponses: SpeakingResponse[] = Object.entries(
          responses
        ).map(([questionId, transcript]) => ({
          questionId: Number.parseInt(questionId, 10),
          transcript,
        }));

        return {
          url: `${baseUrl}/${sessionId}/responses`,
          method: "PUT",
          data: { responses: formattedResponses },
        };
      },
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
  useUpdateSessionResponsesMutation,
  useSubmitSessionMutation,
} = speakingSessionApi;
