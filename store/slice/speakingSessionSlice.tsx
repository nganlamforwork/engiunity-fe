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
    answers: {}, // Initialize empty answers
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
    updateAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      if (state.currentSession) {
        state.currentSession.answers = {
          ...state.currentSession.answers,
          [action.payload.questionId]: action.payload.answer,
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
  },
});

export const {
  setSession,
  updateSession,
  updateAnswer,
  setCurrentQuestionIndex,
  setCurrentStep,
  setLoading,
  setError,
  clearSession,
} = speakingSessionSlice.actions;

export default speakingSessionSlice.reducer;
