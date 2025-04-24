import { IUser } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../api/api";
import { DecodeToken } from "@/utils/token";

const initialState: {
  isAuthenticated: boolean;
  user: null | IUser;
  accessToken: null | string;
} = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await api({
        url: "/auth/refresh",
        method: "POST",
        withCredentials: true,
      });
      const accessToken = result.data.token;
      if (!accessToken) {
        return rejectWithValue("Unable to fetch new access token");
      }
      dispatch(loginSuccess({ token: accessToken }));

      return { accessToken };
    } catch (error) {
      console.error(error);
      return rejectWithValue("An error occurred while initializing auth");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const decodedToken = DecodeToken(action.payload.token);

      state.isAuthenticated = true;
      state.user = {
        id: decodedToken?.id,
        email: decodedToken?.email || "",
        name: decodedToken?.name || "",
      };
      state.accessToken = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
