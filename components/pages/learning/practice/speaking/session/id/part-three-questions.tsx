import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/types/Speaking";

interface PartThreeQuestionsProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
  answerMode: "text" | "chat";
}

export function PartThreeQuestions({
  question,
  answer,
  onAnswerChange,
  answerMode,
}: PartThreeQuestionsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <p className="text-lg font-medium">{question.text}</p>
          {question.subQuestions && question.subQuestions.length > 0 && (
            <ul className="mt-2 space-y-1 list-disc pl-5">
              {question.subQuestions.map((subQ, index) => (
                <li key={index} className="text-muted-foreground">
                  {subQ}
                </li>
              ))}
            </ul>
          )}

          {question.followUp && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium">
                Follow-up questions to consider:
              </p>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                {question.followUp.map((followUp, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {followUp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {answerMode === "text" && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            Type your answer below as if you were speaking:
          </p>
        </div>
      )}
    </div>
  );
}
