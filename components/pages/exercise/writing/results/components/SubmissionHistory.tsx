"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Submission } from "@/types/WritingExercise";
import { formatDate } from "@/utils/format-date";
interface SubmissionHistoryProps {
  submissions: Submission[];
  selectedSubmissionId: string;
  onSelectSubmission: (id: string) => void;
}

export default function SubmissionHistory({
  submissions,
  selectedSubmissionId,
  onSelectSubmission,
}: SubmissionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Submission History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {submissions.map((submission) => (
            <li key={submission.id}>
              <button
                onClick={() => onSelectSubmission(submission.id)}
                className={cn(
                  "w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors",
                  selectedSubmissionId === submission.id && "bg-slate-100"
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(submission.submittedAt)}
                  </span>
                  <span
                    className={cn(
                      "font-medium px-2 py-1 rounded text-sm",
                      getBandScoreColor(submission.overview.totalScore)
                    )}
                  >
                    Band {submission.overview.totalScore.toFixed(1)}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function getBandScoreColor(score: number): string {
  if (score >= 7) return "bg-green-100 text-green-800";
  if (score >= 5.5) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}
