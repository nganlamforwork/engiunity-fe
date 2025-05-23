"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IResponseItem } from "@/types/WritingExercise";
import { formatDate } from "@/utils/format-date";
interface SubmissionHistoryProps {
  submissions: IResponseItem[];
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
        <ul className="divide-y ">
          {submissions.length == 0 ? (
            <p>
              Chưa có lần nộp bài nào, hãy làm bài và quay trở lại xem kết quả
              nha!
            </p>
          ) : (
            submissions.map((submission) => (
              <li key={submission.takeNumber}>
                <button
                  onClick={() => onSelectSubmission(submission.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors",
                    selectedSubmissionId === submission.id && "bg-slate-100"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(submission.takenAt)}
                    </span>
                    <span
                      className={cn(
                        "font-medium px-2 py-1 rounded text-sm",
                        getBandScoreColor(submission.score)
                      )}
                    >
                      Band {submission.score}
                    </span>
                  </div>
                </button>
              </li>
            ))
          )}
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
