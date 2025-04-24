import axios from "axios";

const BE_URL = process.env.BE_URL;

const api = axios.create({
  baseURL: BE_URL ? BE_URL : `http://localhost:8080/`,
  withCredentials: true,
  responseType: "json",
});

export interface ApiResponse<T> {
  message: string;
  error?: string;
  data?: T;
}

export interface ApiError {
  message: string;
}

export { api };
