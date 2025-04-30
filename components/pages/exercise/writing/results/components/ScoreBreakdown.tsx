import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Submission } from "@/types/WritingExercise";

interface ScoreBreakdownProps {
  submission: Submission;
}

export default function ScoreBreakdown({ submission }: ScoreBreakdownProps) {
  const criteriaItems = [
    {
      id: "task-response",
      title: "Task Response",
      score: submission.task_response.score,
      feedback: submission.task_response.feedback,
      improvementSuggestion: submission.task_response.improvementSuggestion,
    },
    {
      id: "coherence-cohesion",
      title: "Coherence & Cohesion",
      score: submission.coherence_and_cohesion.score,
      feedback: submission.coherence_and_cohesion.feedback,
      improvementSuggestion:
        submission.coherence_and_cohesion.improvementSuggestion,
    },
    {
      id: "lexical-resource",
      title: "Lexical Resource",
      score: submission.lexical_resource.score,
      feedback: submission.lexical_resource.feedback,
      improvementSuggestion: submission.lexical_resource.improvementSuggestion,
    },
    {
      id: "grammar",
      title: "Grammar Range & Accuracy",
      score: submission.grammatical_range_and_accuracy.score,
      feedback: submission.grammatical_range_and_accuracy.feedback,
      improvementSuggestion:
        submission.grammatical_range_and_accuracy.improvementSuggestion,
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
                    <span className="font-semibold">
                      Band {item.score.toFixed(1)}
                    </span>
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
