import ExerciseWriting from "@/components/pages/exercise/writing";

interface TestPageProps {
  params: {
    id: string;
  };
}
async function TestPage({ params }: TestPageProps) {
  const { id } = await params;

  return <ExerciseWriting id={id} />;
}
export default TestPage;
