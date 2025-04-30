"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Correction } from "@/types/WritingExercise";

interface EssayWithHighlightsProps {
  essay: string;
  corrections: Correction[];
}

export default function EssayWithHighlights({
  essay,
  corrections,
}: EssayWithHighlightsProps) {
  // Sort corrections by start position to process them in order
  const sortedCorrections = [...corrections].sort(
    (a, b) => a.start_position - b.start_position
  );

  // Function to determine correction type based on error
  const getCorrectionType = (correction: Correction): string => {
    const error = correction.error.toLowerCase();

    if (
      error.includes("grammar") ||
      error.includes("tense") ||
      error.includes("structure")
    ) {
      return "grammar";
    } else if (error.includes("vocabulary") || error.includes("word choice")) {
      return "vocabulary";
    } else if (
      error.includes("coherence") ||
      error.includes("cohesion") ||
      error.includes("linking")
    ) {
      return "coherence";
    } else {
      return "task";
    }
  };

  // Function to get highlight color based on correction type
  const getHighlightColor = (correction: Correction): string => {
    const type = getCorrectionType(correction);

    switch (type) {
      case "grammar":
        return "bg-red-100 border-b border-red-400";
      case "vocabulary":
        return "bg-blue-100 border-b border-blue-400";
      case "coherence":
        return "bg-yellow-100 border-b border-yellow-400";
      case "task":
        return "bg-green-100 border-b border-green-400";
      default:
        return "bg-gray-100 border-b border-gray-400";
    }
  };

  // Process the essay text with corrections
  const renderEssayWithHighlights = () => {
    const result = [];
    let lastIndex = 0;

    for (const correction of sortedCorrections) {
      // Add text before the correction
      if (correction.start_position > lastIndex) {
        result.push(
          <span key={`text-${lastIndex}`}>
            {essay.substring(lastIndex, correction.start_position)}
          </span>
        );
      }

      // Add the highlighted correction with tooltip
      result.push(
        <Tooltip key={`correction-${correction.start_position}`}>
          <TooltipTrigger asChild>
            <span className={`cursor-help ${getHighlightColor(correction)}`}>
              {essay.substring(
                correction.start_position,
                correction.end_position
              )}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="space-y-2 p-1">
              <div className="font-medium">Suggestion:</div>
              <div className="text-green-600">{correction.suggestion}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      );

      lastIndex = correction.end_position;
    }

    // Add any remaining text
    if (lastIndex < essay.length) {
      result.push(
        <span key={`text-${lastIndex}`}>{essay.substring(lastIndex)}</span>
      );
    }

    return result;
  };

  return (
    <TooltipProvider>
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

        <div className="p-4 bg-white border rounded-md leading-7">
          {renderEssayWithHighlights()}
        </div>
      </div>
    </TooltipProvider>
  );
}
