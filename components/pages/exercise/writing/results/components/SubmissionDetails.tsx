import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScoreOverview from "./ScoreOverview";
import EssayWithHighlights from "./EssayWithHighlights";
import ScoreBreakdown from "./ScoreBreakdown";
import { IResponseItem } from "@/types/WritingExercise";

interface SubmissionDetailsProps {
  submission: IResponseItem;
}

export default function SubmissionDetails({
  submission,
}: SubmissionDetailsProps) {
  return (
    <div className="space-y-6">
      <ScoreOverview overview={submission.scoreDetail.overview} />

      <Tabs defaultValue="essay" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="essay">Essay with Feedback</TabsTrigger>
          <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="essay" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <EssayWithHighlights
                essay={submission.content}
                taskResponse={submission.scoreDetail.task_response.corrections}
                lexicalResource={
                  submission.scoreDetail.lexical_resource.corrections
                }
                coherenceAndCohesion={
                  submission.scoreDetail.coherence_and_cohesion.corrections
                }
                grammaticalRangeAndAccuracy={
                  submission.scoreDetail.grammatical_range_and_accuracy
                    .corrections
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="mt-4">
          <ScoreBreakdown scoreDetail={submission.scoreDetail} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
