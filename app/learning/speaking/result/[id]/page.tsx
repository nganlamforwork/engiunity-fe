import React from "react";
import { Metadata } from "next";
import Result from "@/components/pages/learning/practice/speaking/result/id";

export const metadata: Metadata = {
  title: "Result",
};
export default async function ResultPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <Result id={id} />;
}
