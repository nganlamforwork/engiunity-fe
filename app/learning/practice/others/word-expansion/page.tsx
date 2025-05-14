import { Metadata } from "next";
import WordExpansion from "@/components/pages/learning/practice/others/word-expansion/WordExpansion";

export const metadata: Metadata = {
  title: "Word Expansion",
};

const WritingPage = () => {
  return <WordExpansion />;
};

export default WritingPage;
