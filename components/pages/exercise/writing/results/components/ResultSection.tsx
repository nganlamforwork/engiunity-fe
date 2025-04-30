"use client";

import { useState } from "react";

import { mockSubmissions } from "@/lib/mock-data";
import SubmissionDetails from "./SubmissionDetails";
import SubmissionHistory from "./SubmissionHistory";
import TaskSection from "./TaskSection";

export default function ResultsPage() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(
    mockSubmissions[0].id
  );
  const [showTask, setShowTask] = useState(false);

  const selectedSubmission = mockSubmissions.find(
    (submission) => submission.id === selectedSubmissionId
  );

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <TaskSection showTask={showTask} setShowTask={setShowTask} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <SubmissionHistory
            submissions={mockSubmissions}
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
