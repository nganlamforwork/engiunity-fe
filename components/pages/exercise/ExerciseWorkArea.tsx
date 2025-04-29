"use client";

import { useGetWritingExerciseResponseLatestNotScoredQuery } from "@/store/api/writingExercisesApi";
import { IExerciseItem } from "@/types/WritingExercise";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ExerciseWorkAreaProps {
  exercise: IExerciseItem;
  answer: string;
  setAnswer: (value: string) => void;
}
const ExerciseWorkArea = ({
  exercise,
  answer,
  setAnswer,
}: ExerciseWorkAreaProps) => {
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      setLeftWidth(Math.max(10, Math.min(newWidth, 80)));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "auto";
  };

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div
      className="flex flex-1"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="overflow-y-auto p-4" style={{ width: `${leftWidth}%` }}>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: exercise.content }}
        />
        {exercise.image && (
          <img
            src={exercise.image}
            alt={exercise.title}
            className="w-full mt-4"
          />
        )}
      </div>

      <div
        className="bg-gray-100 cursor-col-resize w-2 flex items-center text-muted-foreground text-xs"
        onMouseDown={handleMouseDown}
      >
        ||
      </div>

      <div
        className="bg-white overflow-y-auto p-4 flex flex-col"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <textarea
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full flex-1 p-2 focus:outline-none resize-none"
          placeholder="Bắt đầu viết..."
          rows={10}
          value={answer}
        />
        <div className="text-gray-500 text-sm mt-2">
          {countWords(answer)} từ
        </div>
      </div>
    </div>
  );
};

export default ExerciseWorkArea;
