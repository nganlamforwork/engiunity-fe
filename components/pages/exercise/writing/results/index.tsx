"use client";

import Header from "../../ResultHeader";
import ResultSection from "./components/ResultSection";

interface ExerciseWritingResultsProps {
  id: string;
}
function ExerciseWritingResults({ id }: ExerciseWritingResultsProps) {
  const exerciseId = parseInt(id, 10);

  //   if (isLoading) {
  //     return null;
  //   }

  //   if (error) {
  //     return null;
  //   }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-screen flex flex-col">
        <Header />
        <ResultSection />
      </div>
    </div>
  );
}
export default ExerciseWritingResults;
