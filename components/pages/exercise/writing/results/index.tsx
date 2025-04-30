"use client";

import { useGetAllWritingExerciseResponsesQuery } from "@/store/api/writingExercisesApi";
import Header from "../../ResultHeader";
import ResultSection from "./components/ResultSection";

interface ExerciseWritingResultsProps {
  id: string;
}
function ExerciseWritingResults({ id }: ExerciseWritingResultsProps) {
  const exerciseId = parseInt(id, 10);
  const { data, isLoading, error } =
    useGetAllWritingExerciseResponsesQuery(exerciseId);

  if (isLoading || !data?.exercise || !data?.submissions) {
    return (
      <div className="h-screen flex flex-col">
        <div className="h-screen flex flex-col">
          <Header />
          <div className="w-full flex-1 items-center justify-center flex flex-col gap-2">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
            <p>Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col">
        <div className="h-screen flex flex-col">
          <Header />
          <div className="w-full flex-1 items-center justify-center flex flex-col gap-2 text-destructive">
            Không tải được kết quả. Hãy nhấn reload trang hoặc quay lại sau.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-screen flex flex-col">
        <Header exercise={data.exercise} />
        <ResultSection
          exercise={data.exercise}
          submissions={data.submissions}
        />
      </div>
    </div>
  );
}
export default ExerciseWritingResults;
