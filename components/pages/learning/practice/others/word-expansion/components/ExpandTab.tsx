"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Info, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import type { WordExpansionData } from "../lib/wordData";
import { useExpandWordMutation } from "@/store/api/wordExpansionApi";
import { useState } from "react";

export function ExpandCard() {
  const [inputWord, setInputWord] = useState("");
  const [currentWordData, setCurrentWordData] =
    useState<WordExpansionData | null>(null);

  const [expandWord, { isLoading }] = useExpandWordMutation();

  const handleExpand = async () => {
    if (!inputWord.trim()) return;

    try {
      const response = await expandWord({
        word: inputWord,
      }).unwrap();

      setCurrentWordData(response);
    } catch (error) {
      console.error("Failed to expand word:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleExpand();
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-2xl border-0 bg-white overflow-hidden">
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="word-input" className="text-sm font-medium">
            Enter a word
          </Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="word-input"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g., good, happy, interesting"
                className="pr-8"
              />
              {inputWord && (
                <button
                  onClick={() => setInputWord("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              onClick={handleExpand}
              disabled={!inputWord.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Expanding..." : "Expand"}
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentWordData && !isLoading && (
          <div
            className={`mt-6 space-y-4 transition-all duration-300 
    animate-in fade-in slide-in-from-top-5`}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-gray-800">
                {currentWordData.word}
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {currentWordData?.expansions.map((level, index) => (
                <AccordionItem
                  key={level.synonym}
                  value={`level-${level.level}`}
                  className="px-2 border-gray-200 transition-opacity duration-300 animate-in fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <AccordionTrigger className="text-lg font-medium hover:no-underline py-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-medium"
                      >
                        {level.level}
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="px-3 py-1.5 text-sm bg-transparent text-blue-700 transition-colors"
                      >
                        {level.synonym}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {level.description}
                      </p>

                      <div className="space-y-3 mt-4 bg-gray-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700">
                          Example Sentence:
                        </h4>
                        <h4 className="text-sm font-normal text-gray-700">
                          {level.sentence}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{level.notes}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <p className="text-xs italic text-gray-600">
                          {level.notes}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
