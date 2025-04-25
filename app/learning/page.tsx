import { redirect } from "next/navigation";
import { Metadata } from "next";
import { routes } from "@/utils/routes";

export const metadata: Metadata = {
  title: "Learning",
};

export default function Page() {
  redirect(routes.pages.learning.overview.value);
}
