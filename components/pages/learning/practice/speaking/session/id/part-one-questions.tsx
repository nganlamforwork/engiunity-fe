import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/types/Speaking";

interface PartOneQuestionsProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export function PartOneQuestions({
  question,
  answer,
  onAnswerChange,
}: PartOneQuestionsProps) {
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
        </CardContent>
      </Card>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">
          Type your answer below as if you were speaking:
        </p>
      </div>
    </div>
  );
}
