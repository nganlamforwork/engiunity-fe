import ExerciseWritingResults from "@/components/pages/exercise/writing/results";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing Exercise Result",
};

interface DoWritingExerciseResultsProps {
  params: Promise<{ id: string }>;
}

async function DoWritingExerciseResults({
  params,
}: DoWritingExerciseResultsProps) {
  const { id } = await params;
  return <ExerciseWritingResults id={id} />;
}

export default DoWritingExerciseResults;
