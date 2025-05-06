"use client";

import { useState } from "react";

import SubmissionDetails from "./SubmissionDetails";
import SubmissionHistory from "./SubmissionHistory";
import TaskSection from "./TaskSection";
import { IExerciseItem, IResponseItem } from "@/types/WritingExercise";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SampleEssayGenerator from "./SampleEssayGenerator";

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
          <Tabs defaultValue="feedback">
            <TabsList className="w-full">
              <TabsTrigger value="feedback" className="flex-1">
                Feedback & Corrections
              </TabsTrigger>
              <TabsTrigger value="sample" className="flex-1">
                Sample Essay
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feedback" className="mt-4">
              {selectedSubmission && (
                <SubmissionDetails submission={selectedSubmission} />
              )}
            </TabsContent>

            <TabsContent value="sample" className="mt-4">
              <SampleEssayGenerator
                userEssay={selectedSubmission?.content || null}
                taskDescription={exercise.content}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
