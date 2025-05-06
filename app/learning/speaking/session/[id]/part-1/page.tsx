import Part1Session from "@/components/pages/learning/practice/speaking/session/id/part-one-session";

export default async function Part1SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <Part1Session id={id} />;
}
