import Part2Session from "@/components/pages/learning/practice/speaking/session/id/part-two-session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking Part 2",
};
export default async function Part2SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <Part2Session id={id} />;
}
