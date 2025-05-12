import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISession {
  id: number;
  userId: number;
  readOnly: boolean;
}

interface SessionState {
  currentSession: ISession | null;
  error: string | null;
}

const initialState: SessionState = {
  currentSession: null,
  error: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setCurrentSession: (state, action: PayloadAction<ISession>) => {
      state.currentSession = action.payload;
    },
    clearCurrentSession: (state) => {
      state.currentSession = null;
    },
  },
});

export const { setCurrentSession, clearCurrentSession } = sessionSlice.actions;

export default sessionSlice.reducer;
