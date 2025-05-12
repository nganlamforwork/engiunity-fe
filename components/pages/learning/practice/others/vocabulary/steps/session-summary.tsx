import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VocabularyWord, WritingStepData } from "@/types/type";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function SessionSummary({
  words,
  paragraph,
  writingStepData,
  level,
  topic,
  onComplete,
}: {
  words: VocabularyWord[];
  paragraph: string;
  writingStepData: WritingStepData;
  level?: string;
  topic?: string;
  onComplete: () => void;
}) {
  const session = useSelector(
    (state: RootState) => state.session.currentSession
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 5: Learning Summary</h2>
          <p className="text-muted-foreground mb-6">
            Review your learning progress for this session.
          </p>
        </div>
        {!session?.readOnly && (
          <Button onClick={onComplete}>Complete Session</Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vocabulary Words</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">You learned {words.length} words:</p>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Topic:</span> {topic}
            </div>
            <div>
              <span className="font-medium">Level:</span> {level}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Practice Paragraph</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: paragraph || "" }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Writing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{writingStepData.writing}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{writingStepData.feedback}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improved Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{writingStepData.improvedAnswer}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
