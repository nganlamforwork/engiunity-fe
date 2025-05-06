import Part1Session from "@/components/pages/learning/practice/speaking/session/id/part-one-session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking Part 3",
};
export default async function Part3SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <Part1Session id={id} />;
}
