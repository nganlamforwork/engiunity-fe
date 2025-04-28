"use client";

import ExerciseWorkArea from "@/components/pages/exercise/ExerciseWorkArea";
import Header from "@/components/pages/exercise/Header";
import { useGetWritingExerciseQuery } from "@/store/api/writingExercisesApi";
import { useRouter } from "next/router";
import { useState } from "react";

interface TestPageProps {
  id: string;
}
function ExerciseWriting({ id }: TestPageProps) {
  const {
    data: exercise,
    isLoading,
    error,
  } = useGetWritingExerciseQuery(parseInt(id, 10));

  const [answer, setAnswer] = useState("");

  if (isLoading) {
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
        <Header
          part={exercise.part}
          exerciseId={parseInt(id, 10)}
          answer={answer}
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
