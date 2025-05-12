"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PartTwoPrompt } from "@/components/pages/learning/practice/speaking/session/id/part-two-prompt";
import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { routes } from "@/utils/routes";
import {
  useGetQuestionsQuery,
  useGetSpeakingSessionQuery,
  useUpdateSessionResponsesMutation,
} from "@/store/api/speakingSessionApi";
import { ESpeakingPart } from "@/types/Speaking";

interface Part2SessionProps {
  id: string;
}

export default function Part2Session({ id }: Part2SessionProps) {
  const router = useRouter();
  const sessionId = parseInt(id, 10);

  // Local state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [hasInitialized, setHasInitialized] = useState(false);

  const {
    data: sessionData,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useGetSpeakingSessionQuery({ id: sessionId });

  const {
    data: questions,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useGetQuestionsQuery({
    sessionId,
    part: ESpeakingPart.PART_2,
  });

  const [updateSessionResponses] = useUpdateSessionResponsesMutation();

  useEffect(() => {
    if (questions && questions.length > 0 && !hasInitialized) {
      const initialResponses: Record<string, string> = {}

      questions.forEach((question) => {
        if (question.response && question.response.transcript) {
          initialResponses[question.id.toString()] = question.response.transcript
        }
      })

      if (Object.keys(initialResponses).length > 0) {
        setResponses(initialResponses)
      }

      setHasInitialized(true)
    }
  }, [questions, hasInitialized])

  const handleResponseChange = (questionId: string, response: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: response,
    }));
  };

  const saveResponses = async () => {
    try {
      await updateSessionResponses({
        sessionId,
        responses,
      }).unwrap();
      console.log("Responses saved successfully");
    } catch (err) {
      console.error("Error saving responses:", err);
    }
  };

  const nextQuestion = () => {
    if (!questions) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      saveResponses().then(() => {
        router.push(`/learning/speaking/session/${id}/part-3`);
      });
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      saveResponses().then(() => {
        router.push(`/learning/speaking/session/${id}/part-1`);
      });
    }
  };

  // Loading or error UI
  if (sessionLoading || questionsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (sessionError || questionsError || !questions || !sessionData) {
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <p className="text-red-500 mb-4">Failed to load session or questions</p>
        <Button onClick={() => router.push("/learning/speaking")}>
          Return to Speaking
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex-1 overflow-auto">
      <HeaderSkill
        title={sessionData.topic}
        description="Luyện tập kỹ năng nói IELTS - Part 2: Nói dài (Cue card)"
        topElements={
          <Button
            variant="ghost"
            onClick={() => {
              saveResponses().then(() => {
                router.push(routes.pages.learning.speaking.new.value);
              });
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        }
      />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="part-2" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="part-1"
              disabled={!sessionData.part.includes(ESpeakingPart.FULL)}
              onClick={() =>
                saveResponses().then(() =>
                  router.push(`/learning/speaking/session/${id}/part-1`)
                )
              }
            >
              Part 1
            </TabsTrigger>
            <TabsTrigger value="part-2">Part 2</TabsTrigger>
            <TabsTrigger
              value="part-3"
              disabled={!sessionData.part.includes(ESpeakingPart.FULL)}
              onClick={() =>
                saveResponses().then(() =>
                  router.push(`/learning/speaking/session/${id}/part-3`)
                )
              }
            >
              Part 3
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6">
          <div className="flex justify-start items-center mb-2">
            <span className="text-sm font-medium">
              Câu hỏi {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-gray-100" />
        </div>

        <div>
          <PartTwoPrompt
            question={{
              id: currentQuestion.id.toString(),
              text: currentQuestion.text,
              subQuestions: currentQuestion.subQuestions || [],
              cueCard: currentQuestion.cueCard || [],
            }}
            answer={responses[currentQuestion.id.toString()] || ""}
            onAnswerChange={(response) =>
              handleResponseChange(currentQuestion.id.toString(), response)
            }
            answerMode="text"
          />
          <div className="mt-4">
            <Textarea
              placeholder="Nhập câu trả lời của bạn ở đây..."
              className="min-h-[150px]"
              value={responses[currentQuestion.id.toString()] || ""}
              onChange={(e) =>
                handleResponseChange(
                  currentQuestion.id.toString(),
                  e.target.value
                )
              }
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="secondary" onClick={prevQuestion}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Câu trước
            </Button>
            <Button onClick={nextQuestion}>
              {currentQuestionIndex === questions.length - 1
                ? "Phần tiếp theo"
                : "Câu tiếp theo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
