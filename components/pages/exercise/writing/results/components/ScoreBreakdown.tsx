import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScoreDetail } from "@/types/WritingExercise";

interface ScoreBreakdownProps {
  scoreDetail: ScoreDetail;
}

export default function ScoreBreakdown({ scoreDetail }: ScoreBreakdownProps) {
  const criteriaItems = [
    {
      id: "task-response",
      title: "Task Response",
      score: scoreDetail.task_response.score,
      feedback: scoreDetail.task_response.feedback,
      improvementSuggestion: scoreDetail.task_response.improvementSuggestion,
    },
    {
      id: "coherence-cohesion",
      title: "Coherence & Cohesion",
      score: scoreDetail.coherence_and_cohesion.score,
      feedback: scoreDetail.coherence_and_cohesion.feedback,
      improvementSuggestion:
        scoreDetail.coherence_and_cohesion.improvementSuggestion,
    },
    {
      id: "lexical-resource",
      title: "Lexical Resource",
      score: scoreDetail.lexical_resource.score,
      feedback: scoreDetail.lexical_resource.feedback,
      improvementSuggestion: scoreDetail.lexical_resource.improvementSuggestion,
    },
    {
      id: "grammar",
      title: "Grammar Range & Accuracy",
      score: scoreDetail.grammatical_range_and_accuracy.score,
      feedback: scoreDetail.grammatical_range_and_accuracy.feedback,
      improvementSuggestion:
        scoreDetail.grammatical_range_and_accuracy.improvementSuggestion,
    },
  ];

  return (
    <Card className="shadow-none">
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          {criteriaItems.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between items-center w-full pr-4">
                  <span>{item.title}</span>
                  <div className="flex items-center gap-4">
                    <Progress
                      value={(item.score / 9) * 100}
                      className="w-24 h-2"
                    />
                    <span className="font-semibold">Band {item.score}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Feedback:</h4>
                    <p className="text-sm text-slate-700">{item.feedback}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-md border">
                    <h4 className="font-medium text-sm mb-1">
                      How to improve:
                    </h4>
                    <p className="text-sm text-slate-700">
                      {item.improvementSuggestion}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
