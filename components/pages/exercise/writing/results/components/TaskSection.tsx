"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IExerciseItem } from "@/types/WritingExercise";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TaskSectionProps {
  showTask: boolean;
  setShowTask: (show: boolean) => void;
  exercise: IExerciseItem;
}

export default function TaskSection({
  showTask,
  setShowTask,
  exercise,
}: TaskSectionProps) {
  return (
    <div className="mb-6">
      <Button
        variant="outline"
        onClick={() => setShowTask(!showTask)}
        className="mb-2 flex items-center gap-2"
      >
        {showTask ? (
          <>
            <ChevronUp className="h-4 w-4" /> Hide Task
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" /> Show Task
          </>
        )}
      </Button>

      {showTask && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{exercise.part}</h3>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: exercise.content }}
              />
              {exercise.image && (
                <img
                  src={exercise.image}
                  alt={exercise.title}
                  className="mx-auto max-w-[500px]"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
