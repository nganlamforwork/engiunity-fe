"use client";

import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RootState, useAppSelector } from "@/store";

import { Button } from "@/components/ui/button";
import { VocabularyWord } from "@/types/type";
import { useCompleteReadingMutation } from "@/store/api/vocabulariesApi";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContextualInput({
  words,
  paragraph,
  onComplete,
}: {
  words: VocabularyWord[];
  paragraph: string;
  onComplete: () => void;
}) {
  const { toast } = useToast();
  const [readingMode, setReadingMode] = useState(false);
  const [hideWords, setHideWords] = useState(false);
  const [completeReadingMutation, { isLoading: loading }] =
    useCompleteReadingMutation();
  const session = useAppSelector(
    (state: RootState) => state.session.currentSession
  );

  const handleComplete = async () => {
    try {
      await completeReadingMutation({
        sessionId: session?.id,
      }).unwrap();
      onComplete();
    } catch (error) {
      console.error("Error completing reading:", error);
      toast({
        title: "Error",
        description: "Failed to mark reading as complete. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Step 3: Contextual Input</h2>
        <p className="text-muted-foreground mb-6">
          Read the paragraph multiple times to memorize the words in context.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setReadingMode(!readingMode)}
        >
          {readingMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Exit Reading Mode
            </>
          ) : (
            <>
              <BookOpen className="h-4 w-4 mr-2" />
              Enter Reading Mode
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setHideWords(!hideWords)}
        >
          {hideWords ? (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show Words
            </>
          ) : (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Words
            </>
          )}
        </Button>
      </div>

      {readingMode ? (
        <div className="fixed inset-0 bg-background z-50 p-8 !m-0 overflow-auto">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                className="mb-8"
                onClick={() => setReadingMode(false)}
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Exit Reading Mode
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHideWords(!hideWords)}
              >
                {hideWords ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Show Words
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Words
                  </>
                )}
              </Button>
            </div>

            {!hideWords && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Words to Focus On</h3>
                <div className="flex flex-wrap gap-2">
                  {words.map((word) => (
                    <div
                      key={word.word}
                      className="bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {word.word}: {word.vietnameseTranslation}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: paragraph || "" }}
            />
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            {!hideWords && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Words to Focus On</h3>
                <div className="flex flex-wrap gap-2">
                  {words.map((word) => (
                    <div
                      key={word.word}
                      className="bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {word.word}: {word.vietnameseTranslation}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-lg font-medium mb-4">Practice Paragraph</h3>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: paragraph || "" }}
            />
          </CardContent>
        </Card>
      )}

      {!session?.readOnly && (
        <div className="flex justify-end">
          <Button onClick={handleComplete} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            I've Memorized the Words - Continue to Step 4
          </Button>
        </div>
      )}
    </div>
  );
}
