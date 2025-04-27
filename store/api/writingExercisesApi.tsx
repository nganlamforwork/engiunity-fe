import { CreateUserDto } from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./customBaseQuery";
import {
  CreateExerciseDto,
  IExerciseSummaryItem,
} from "@/types/WritingExercise";

const baseUrl = "writing/exercises";

export const writingExercisesApi = createApi({
  reducerPath: "writingExercisesApi",
  baseQuery: axiosBaseQuery(),
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Writing Exercises"],
  endpoints: (builder) => ({
    createWritingExerciseManually: builder.mutation<
      any,
      { data: CreateExerciseDto; image: File | null }
    >({
      query: ({ data, image }) => {
        const formData = new FormData();

        formData.append("data", JSON.stringify(data));

        if (image) {
          formData.append("image", image);
        }
        console.log(formData);
        return {
          url: `${baseUrl}`,
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: ["Writing Exercises"],
    }),
    getAllWritingExercises: builder.query<IExerciseSummaryItem[], void>({
      query: () => ({
        url: `${baseUrl}`,
        method: "GET",
      }),
      providesTags: ["Writing Exercises"],
    }),
  }),
});

export const {
  useCreateWritingExerciseManuallyMutation,
  useGetAllWritingExercisesQuery,
} = writingExercisesApi;
