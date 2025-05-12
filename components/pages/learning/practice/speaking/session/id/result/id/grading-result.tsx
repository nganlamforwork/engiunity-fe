import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import type { Evaluation } from "@/types/Speaking";
import { CheckCircle, AlertCircle, ArrowUpCircle } from "lucide-react";

interface GradingResultsProps {
  results: {
    scoreDetail: Evaluation;
  };
}

export function GradingResults({ results }: GradingResultsProps) {
  const {
    fluency_and_coherence,
    lexical_resource,
    grammatical_range_and_accuracy,
    pronunciation,
  } = results.scoreDetail;

  const criteriaItems = [
    {
      id: "fluency",
      title: "Fluency & Coherence",
      score: fluency_and_coherence.score,
      feedback: fluency_and_coherence.feedback,
      improvementSuggestion: fluency_and_coherence.improvementSuggestion,
      examples: fluency_and_coherence.examples,
      color: "bg-emerald-500",
      rootColor: "bg-emerald-100",
    },
    {
      id: "lexical",
      title: "Lexical Resource",
      score: lexical_resource.score,
      feedback: lexical_resource.feedback,
      improvementSuggestion: lexical_resource.improvementSuggestion,
      examples: lexical_resource.examples,
      color: "bg-sky-500",
      rootColor: "bg-sky-100",
    },
    {
      id: "grammar",
      title: "Grammatical Range & Accuracy",
      score: grammatical_range_and_accuracy.score,
      feedback: grammatical_range_and_accuracy.feedback,
      improvementSuggestion:
        grammatical_range_and_accuracy.improvementSuggestion,
      examples: grammatical_range_and_accuracy.examples,
      color: "bg-violet-500",
      rootColor: "bg-violet-100",
    },
    {
      id: "pronunciation",
      title: "Pronunciation",
      score: pronunciation.score,
      feedback: pronunciation.feedback,
      improvementSuggestion: pronunciation.improvementSuggestion,
      examples: pronunciation.examples,
      color: "bg-amber-500",
      rootColor: "bg-amber-100",
    },
  ];

  // Helper function to get score color
  const getScoreColor = (score: number) => {
    if (score >= 7.5) return "text-emerald-600";
    if (score >= 6.5) return "text-sky-600";
    if (score >= 5.5) return "text-amber-600";
    return "text-rose-600";
  };

  // Helper function to get score label
  const getScoreLabel = (score: number) => {
    if (score >= 7.5) return "Excellent";
    if (score >= 6.5) return "Good";
    if (score >= 5.5) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={criteriaItems[0].id}
    >
      {criteriaItems.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="mb-4 border rounded-lg overflow-hidden shadow-sm"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 bg-slate-50">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-6 rounded-full ${item.color}`}></div>
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end mr-2">
                  <div className="flex items-center">
                    <Progress
                      value={(item.score / 9) * 100}
                      className="w-24 h-2.5 mr-3"
                      color={item.color}
                      rootColor={item.rootColor}
                    />
                    <span className={`font-bold `}>
                      {item.score.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1">
                    {getScoreLabel(item.score)}
                  </span>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-5 bg-white">
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h4 className="font-medium text-sm mb-2 flex items-center text-slate-700">
                  <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                  Feedback
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.feedback}
                </p>
              </div>

              <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
                <h4 className="font-medium text-sm mb-2 flex items-center text-slate-700">
                  <ArrowUpCircle className="h-4 w-4 mr-2 text-sky-500" />
                  How to improve
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.improvementSuggestion}
                </p>
              </div>

              {item.examples?.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <h4 className="font-medium text-sm p-3 bg-slate-50 border-b flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                    Examples & Comments
                  </h4>
                  <div className="divide-y">
                    {item.examples.map((example, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-slate-50 transition-colors"
                      >
                        <p className="text-sm font-medium text-slate-800 mb-1">
                          "{example.excerpt}"
                        </p>
                        <div className="flex items-start mt-2">
                          <div className="bg-slate-200 h-px w-4 mt-3 mr-2"></div>
                          <p className="text-sm text-slate-600">
                            {example.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
