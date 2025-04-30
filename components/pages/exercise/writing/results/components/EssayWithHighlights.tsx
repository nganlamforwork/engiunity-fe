"use client";
import { Correction } from "@/types/WritingExercise";
import { useRef, useEffect } from "react";
interface EssayWithHighlightsProps {
  essay: string;
  lexicalResource: Correction[];
  coherenceAndCohesion: Correction[];
  grammaticalRangeAndAccuracy: Correction[];
  taskResponse: Correction[];
}

export default function EssayWithHighlights({
  essay,
  lexicalResource = [],
  coherenceAndCohesion = [],
  grammaticalRangeAndAccuracy = [],
  taskResponse = [],
}: EssayWithHighlightsProps) {
  const essayRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 text-sm mb-4">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span>Grammar</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-400"></span>
          <span>Vocabulary</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span>Coherence</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
          <span>Task Response</span>
        </div>
      </div>

      <div
        ref={essayRef}
        className="p-4 bg-white border rounded-md leading-7 relative whitespace-pre-wrap"
      >
        {essay}
      </div>
    </div>
  );
}
