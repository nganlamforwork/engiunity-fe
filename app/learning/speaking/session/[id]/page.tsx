import { redirect } from "next/navigation";

export default function SessionPage({ params }: { params: { id: string } }) {
  redirect(`/learning/speaking/session/${params.id}/part-1`);
}
