"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dispatch, SetStateAction, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyWord, WritingStepData } from "@/types/type";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RootState } from "@/store";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateFeedbackMutation } from "@/store/api/vocabulariesApi";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

export default function WritingOutput({
  words,
  onComplete,
  writingStepData,
  setFeedback,
  setImprovedAnswer,
  setWriting,
}: {
  words: VocabularyWord[];
  onComplete: () => void;
  writingStepData: WritingStepData;
  setFeedback: Dispatch<SetStateAction<string>>;
  setImprovedAnswer: Dispatch<SetStateAction<string>>;
  setWriting: Dispatch<SetStateAction<string>>;
}) {
  const { toast } = useToast();
  const { writing, feedback, improvedAnswer } = writingStepData;

  const [activeTab, setActiveTab] = useState("write");
  const session = useSelector(
    (state: RootState) => state.session.currentSession
  );

  const [generateFeedbackMutation, { isLoading: loading }] =
    useGenerateFeedbackMutation();

  const handleSubmitWriting = async () => {
    if (!writing.trim()) return;

    try {
      // Call the backend API to generate feedback
      const result = await generateFeedbackMutation({
        sessionId: session?.id,
        writing: writing,
      }).unwrap();

      setFeedback(result.feedback);
      setImprovedAnswer(result.improvedAnswer);
      setActiveTab("feedback");
    } catch (error) {
      console.error("Error generating feedback:", error);
      toast({
        title: "Error",
        description: "Failed to generate feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleComplete = () => {
    if (writing && feedback && improvedAnswer) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Step 4: Writing Output</h2>
        <p className="text-muted-foreground mb-6">
          Write a paragraph using all the vocabulary words. You'll receive
          feedback and an improved version of your writing.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Words to Use</h3>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="feedback" disabled={!feedback}>
            Feedback
          </TabsTrigger>
          <TabsTrigger value="improved" disabled={!improvedAnswer}>
            Improved Answer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <Card>
            <CardHeader>
              <CardTitle>Write Your Paragraph</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write a paragraph using all the vocabulary words..."
                className="min-h-[200px]"
                value={writing}
                onChange={(e) => setWriting(e.target.value)}
              />
              {!session?.readOnly && (
                <Button
                  onClick={handleSubmitWriting}
                  className="mt-4"
                  disabled={!writing.trim() || loading || feedback.length > 0}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit for Feedback
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback on Your Writing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>{feedback}</p>
              </div>
              {!session?.readOnly && (
                <Button
                  onClick={() => setActiveTab("improved")}
                  className="mt-4"
                >
                  See Improved Answer
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improved">
          <Card>
            <CardHeader>
              <CardTitle>Improved Answer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p>{improvedAnswer}</p>
              </div>
              {!session?.readOnly && (
                <Button onClick={handleComplete} className="mt-4">
                  Complete Learning Session
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
