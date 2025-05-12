import { Metadata } from "next";
import VocabularyLearning from "@/components/pages/learning/practice/others/vocabulary/VocabularyLearning";

export const metadata: Metadata = {
  title: "Vocabulary",
};

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Vocabulary Learning Assistant</h1>
      <VocabularyLearning />
    </main>
  );
}
