"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dispatch, SetStateAction, useState } from "react";
import { RootState, useAppSelector } from "@/store";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VocabularyWord } from "@/types/type";
import { useGenerateParagraphMutation } from "@/store/api/vocabulariesApi";
import { useToast } from "@/hooks/use-toast";

export default function ParagraphGeneration({
  words,
  paragraph,
  setParagraph,
  onComplete,
}: {
  paragraph: string;
  setParagraph: Dispatch<SetStateAction<string>>;
  words: VocabularyWord[];
  onComplete: () => void;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generateParagraphMutation] = useGenerateParagraphMutation();
  const session = useAppSelector(
    (state: RootState) => state.session.currentSession
  );

  const handleGenerateParagraph = async () => {
    setLoading(true);
    try {
      const response = await generateParagraphMutation({
        sessionId: session?.id,
      }).unwrap();

      setParagraph(response.paragraph);
    } catch (error) {
      console.error("Error generating paragraph:", error);
      toast({
        title: "Error",
        description: "Failed to generate paragraph. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Step 2: Paragraph Generation
        </h2>
        <p className="text-muted-foreground mb-6">
          Generate a paragraph using your selected vocabulary words to see them
          in context.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Vocabulary Words</h3>
          <div className="flex flex-wrap gap-2">
            {words.map((word) => (
              <div
                key={word.word}
                className="bg-primary/10 text-primary px-2 py-1 rounded"
              >
                {word.word}
              </div>
            ))}
          </div>
        </div>

        {!session?.readOnly && (
          <Button
            onClick={handleGenerateParagraph}
            disabled={loading || words.length === 0 || paragraph.length > 0}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Paragraph
          </Button>
        )}

        {paragraph && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Practice Paragraph</h3>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
              {!session?.readOnly && (
                <Button onClick={onComplete} className="mt-6">
                  Continue to Step 3
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
