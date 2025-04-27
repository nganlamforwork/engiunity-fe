"use client";

import { Button } from "@/components/ui/button";
import { ListFilter, Loader2 } from "lucide-react";
import ExerciseCard from "../../ExerciseCard";
import { CreateExerciseAIDialog } from "./CreateExerciseAIDialog";
import { ManuallyCreateExerciseSheet } from "./ManualCreateExerciseSheet";
import { useGetAllWritingExercisesQuery } from "@/store/api/writingExercisesApi";

const ExerciseTab = () => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetAllWritingExercisesQuery();

  return (
    <div className="mt-4">
      {/* Header & Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <ListFilter />
          </Button>
          <div>
            <p className="text-xl font-semibold">Danh sách các bài tập</p>
            <p className="text-sm text-muted-foreground">Đã làm 0/12 bài</p>
          </div>
        </div>
        <div className="flex gap-2">
          <ManuallyCreateExerciseSheet />

          <CreateExerciseAIDialog />
        </div>
      </div>

      {/* Exercise List */}
      <div className="mt-4 flex flex-col gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Đã xảy ra lỗi khi tải bài tập.
          </div>
        ) : (
          exercises?.map((exercise) => (
            <ExerciseCard key={exercise.id} data={exercise} />
          ))
        )}
      </div>
    </div>
  );
};

export default ExerciseTab;
