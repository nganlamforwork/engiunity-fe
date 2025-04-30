"use client";

import { useState } from "react";

import { mockSubmissions } from "@/lib/mock-data";
import SubmissionDetails from "./SubmissionDetails";
import SubmissionHistory from "./SubmissionHistory";
import TaskSection from "./TaskSection";
import { IExerciseItem, IResponseItem } from "@/types/WritingExercise";

interface ResultSectionProps {
  exercise: IExerciseItem;
  submissions: IResponseItem[];
}

export default function ResultSection({
  exercise,
  submissions,
}: ResultSectionProps) {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(
    submissions[0].id
  );
  const [showTask, setShowTask] = useState(false);

  const selectedSubmission = submissions.find(
    (submission) => submission.id === selectedSubmissionId
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <TaskSection
        showTask={showTask}
        setShowTask={setShowTask}
        exercise={exercise}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <SubmissionHistory
            submissions={submissions}
            selectedSubmissionId={selectedSubmissionId}
            onSelectSubmission={setSelectedSubmissionId}
          />
        </div>

        <div className="md:col-span-3">
          {selectedSubmission && (
            <SubmissionDetails submission={selectedSubmission} />
          )}
        </div>
      </div>
    </div>
  );
}
