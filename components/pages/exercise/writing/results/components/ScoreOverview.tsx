import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Overview } from "@/types/WritingExercise";

interface ScoreOverviewProps {
  overview: Overview;
}

export default function ScoreOverview({ overview }: ScoreOverviewProps) {
  const { totalScore, totalFeedback, overallImprovementSuggestion } = overview;

  // Convert score to percentage for progress bar
  const scorePercentage = (totalScore / 9) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Overall Score</span>
          <span className="text-2xl font-bold">
            Band {totalScore.toFixed(1)}
          </span>
        </CardTitle>
        <CardDescription>{totalFeedback}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Band 0</span>
              <span>Band 9</span>
            </div>
            <Progress value={scorePercentage} className="h-2" />
          </div>

          <div className="bg-slate-50 p-4 rounded-md border mt-4">
            <h4 className="font-medium mb-2">Improvement Suggestion</h4>
            <p className="text-sm text-slate-700">
              {overallImprovementSuggestion}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
