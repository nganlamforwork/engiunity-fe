import { redirect } from "next/navigation";

export default async function SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  redirect(`/learning/speaking/session/${id}/part-1`);
}
