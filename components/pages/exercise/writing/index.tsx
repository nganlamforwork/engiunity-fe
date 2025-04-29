"use client";

import ExerciseWorkArea from "@/components/pages/exercise/ExerciseWorkArea";
import Header from "@/components/pages/exercise/Header";
import {
  useGetWritingExerciseQuery,
  useGetWritingExerciseResponseLatestNotScoredQuery,
} from "@/store/api/writingExercisesApi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface TestPageProps {
  id: string;
}
function ExerciseWriting({ id }: TestPageProps) {
  const exerciseId = parseInt(id, 10);
  const {
    data: exercise,
    isLoading,
    error,
  } = useGetWritingExerciseQuery(exerciseId);

  const {
    data: latestResponse,
    isLoading: isResponseLoading,
    error: responseError,
  } = useGetWritingExerciseResponseLatestNotScoredQuery(exerciseId);

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
      <div className="flex flex-col items-center justify-center h-screen">
        <Header />
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Header />
        <p>Không tải được đề bài.</p>
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
