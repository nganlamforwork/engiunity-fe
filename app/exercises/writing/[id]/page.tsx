import ExerciseWriting from "@/components/pages/exercise/writing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Take Writing Exercise",
};

interface DoWritingExerciseProps {
  params: Promise<{ id: string }>;
}
async function DoWritingExercise({ params }: DoWritingExerciseProps) {
  const { id } = await params;

  return <ExerciseWriting id={id} />;
}
export default DoWritingExercise;
