import Part1Session from "@/components/pages/learning/practice/speaking/session/id/part-one-session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking Part 1",
};
export default async function Part1SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } =  params;

  return <Part1Session id={id} />;
}
