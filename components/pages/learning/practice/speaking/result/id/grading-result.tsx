import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GradingResult } from "@/types/Speaking";

interface GradingResultsProps {
  results: GradingResult;
}

export function GradingResults({ results }: GradingResultsProps) {
  const criteriaData = [
    {
      name: "Idea Development",
      score: results.ideaDevelopment.score,
      feedback: results.ideaDevelopment.feedback,
      strengths: results.ideaDevelopment.strengths,
      improvements: results.ideaDevelopment.improvements,
    },
    {
      name: "Vocabulary",
      score: results.vocabulary.score,
      feedback: results.vocabulary.feedback,
      strengths: results.vocabulary.strengths,
      improvements: results.vocabulary.improvements,
    },
    {
      name: "Grammar",
      score: results.grammar.score,
      feedback: results.grammar.feedback,
      strengths: results.grammar.strengths,
      improvements: results.grammar.improvements,
    },
    {
      name: "Coherence",
      score: results.coherence.score,
      feedback: results.coherence.feedback,
      strengths: results.coherence.strengths,
      improvements: results.coherence.improvements,
    },
  ];

  return (
    <div className="space-y-6">
      {criteriaData.map((criteria, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>{criteria.name}</CardTitle>
              <div className="text-2xl font-bold">
                {criteria.score.toFixed(1)}
                <span className="text-sm text-muted-foreground">/9</span>
              </div>
            </div>
            <Progress value={(criteria.score / 9) * 100} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{criteria.feedback}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Strengths</h4>
                <ul className="space-y-1 list-disc pl-5">
                  {criteria.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">
                  Areas for Improvement
                </h4>
                <ul className="space-y-1 list-disc pl-5">
                  {criteria.improvements.map((improvement, idx) => (
                    <li key={idx} className="text-sm">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
