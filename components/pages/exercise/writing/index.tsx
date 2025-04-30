"use client";
import ExerciseWorkArea from "@/components/pages/exercise/writing/ExerciseWorkArea";
import Header from "@/components/pages/exercise/Header";
import {
  useGetWritingExerciseQuery,
  useGetWritingExerciseResponseLatestNotScoredQuery,
} from "@/store/api/writingExercisesApi";
import { useEffect, useState } from "react";

interface ExerciseWritingProps {
  id: string;
}
function ExerciseWriting({ id }: ExerciseWritingProps) {
  const exerciseId = parseInt(id, 10);
  const {
    data: exercise,
    isLoading,
    error,
  } = useGetWritingExerciseQuery(exerciseId);

  const { data: latestResponse, isLoading: isResponseLoading } =
    useGetWritingExerciseResponseLatestNotScoredQuery(exerciseId);

  const [answer, setAnswer] = useState("");
  const [responseId, setResponseId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (latestResponse?.content) {
      setAnswer(latestResponse.content);
      setResponseId(latestResponse.id);
    }
  }, [latestResponse]);

  if (isLoading || isResponseLoading) {
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

  if (error || !exercise) {
    return (
      <div className="h-screen flex flex-col">
        <div className="h-screen flex flex-col">
          <Header />
          <div className="w-full flex-1 items-center justify-center flex flex-col gap-2 text-destructive">
            Không tải được đề bài. Hãy nhấn reload trang hoặc quay lại sau.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-screen flex flex-col">
        {/* {JSON.stringify(latestResponse)} */}
        <Header
          part={exercise.part}
          exerciseId={parseInt(id, 10)}
          answer={answer}
          responseId={responseId}
        />
        <ExerciseWorkArea
          exercise={exercise}
          answer={answer}
          setAnswer={setAnswer}
        />
      </div>
    </div>
  );
}
export default ExerciseWriting;
