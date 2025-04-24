/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { api } from "./api";
import { RootState } from "..";
import { loginSuccess, logout } from "../slice/authSlice";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: string;
      data?: unknown;
      params?: Record<string, any>;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }, apiContext) => {
    try {
      const skipAuth = ["auth/login", "auth/refresh"].includes(url);

      // Get accessToken from persist store
      const state = apiContext.getState() as RootState;
      let token = state.auth.accessToken;

      // If there's no accessToken, attempt to refresh it using the refreshToken
      if (!token && !skipAuth) {
        try {
          const refreshResult = await api({
            url: "/auth/refresh",
            method: "POST",
            withCredentials: true,
          });

          const token = refreshResult.data.token;

          apiContext.dispatch(loginSuccess({ ...token }));
        } catch (refreshError) {
          const err = refreshError as AxiosError;

          if (err.response?.status === 401) {
            apiContext.dispatch(logout());
            alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            window.location.href = "/login";
          }

          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      }

      // Now perform the API request with the valid token
      const result = await api({
        url,
        method,
        data,
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
