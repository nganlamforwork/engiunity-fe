import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SessionState, SpeakingSession } from "@/types/Speaking";

interface SpeakingSessionState {
  currentSession: SessionState | null;
  loading: boolean;
  error: string | null;
}

const initialState: SpeakingSessionState = {
  currentSession: null,
  loading: false,
  error: null,
};

// Helper function to convert backend session to frontend session state
const convertToSessionState = (session: SpeakingSession): SessionState => {
  return {
    id: session.id,
    topic: session.topic,
    notes: session.notes,
    status: session.status,
    part: session.part,
    currentStep: 1, // Default to step 1 (Part 1)
    currentQuestionIndex: 0, // Default to first question
    responses: {}, // Initialize empty responses
    createdAt: session.createdAt,
  };
};

export const speakingSessionSlice = createSlice({
  name: "speakingSession",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<SpeakingSession>) => {
      state.currentSession = convertToSessionState(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateSession: (state, action: PayloadAction<Partial<SessionState>>) => {
      if (state.currentSession) {
        state.currentSession = {
          ...state.currentSession,
          ...action.payload,
        };
      }
    },
    updateResponse: (
      state,
      action: PayloadAction<{ questionId: string; response: string }>
    ) => {
      if (state.currentSession) {
        // Initialize responses if it doesn't exist
        if (!state.currentSession.responses) {
          state.currentSession.responses = {};
        }

        state.currentSession.responses = {
          ...state.currentSession.responses,
          [action.payload.questionId]: action.payload.response,
        };
      }
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      if (state.currentSession) {
        state.currentSession.currentQuestionIndex = action.payload;
      }
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      if (state.currentSession) {
        state.currentSession.currentStep = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSession: (state) => {
      state.currentSession = null;
      state.loading = false;
      state.error = null;
    },
    // Add a new action to migrate old data structure
    migrateAnswersToResponses: (state) => {
      if (state.currentSession) {
        // Check if we have the old answers field in the state
        // @ts-ignore - We know this might exist in the persisted state
        const oldAnswers = state.currentSession.answers;

        if (oldAnswers && !state.currentSession.responses) {
          // Migrate old answers to new responses field
          state.currentSession.responses = oldAnswers;
          // Remove old answers field
          // @ts-ignore - We're intentionally removing this
          delete state.currentSession.answers;
        }
      }
    },
  },
});

export const {
  setSession,
  updateSession,
  updateResponse,
  setCurrentQuestionIndex,
  setCurrentStep,
  setLoading,
  setError,
  clearSession,
  migrateAnswersToResponses,
} = speakingSessionSlice.actions;

export default speakingSessionSlice.reducer;
