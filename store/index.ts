"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/store/api/authApi";
import { authSlice } from "@/store/slice/authSlice";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { persistReducer, persistStore, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersApi } from "./api/usersApi";
import { writingExercisesApi } from "./api/writingExercisesApi";
import { speakingSessionApi } from "./api/speakingSessionApi";
import { speakingSessionSlice } from "./slice/speakingSessionSlice";

// Define migrations for redux-persist
const migrations = {
  // Migration to convert answers to responses
  1: (state: any) => {
    if (state.speakingSession && state.speakingSession.currentSession) {
      const currentSession = state.speakingSession.currentSession;
      if (currentSession.answers && !currentSession.responses) {
        return {
          ...state,
          speakingSession: {
            ...state.speakingSession,
            currentSession: {
              ...currentSession,
              responses: { ...currentSession.answers },
              // Don't delete answers here as it might cause issues
            },
          },
        };
      }
    }
    return state;
  },
};

const persistConfig = {
  key: "root",
  storage,
  version: 1, // Set the current version
  migrate: createMigrate(migrations, {
    debug: process.env.NODE_ENV === "development",
  }),
};

const combinedReducers = combineReducers({
  auth: authSlice.reducer,
  speakingSession: speakingSessionSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [writingExercisesApi.reducerPath]: writingExercisesApi.reducer,
  [speakingSessionApi.reducerPath]: speakingSessionApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(writingExercisesApi.middleware)
      .concat(speakingSessionApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
