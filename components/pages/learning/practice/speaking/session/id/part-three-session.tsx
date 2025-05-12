"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Loader2, Send } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PartThreeQuestions } from "@/components/pages/learning/practice/speaking/session/id/part-three-questions";
import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { routes } from "@/utils/routes";
import {
  useGetQuestionsQuery,
  useGetSpeakingSessionQuery,
  useSubmitSessionMutation,
  useUpdateSessionResponsesMutation,
} from "@/store/api/speakingSessionApi";
import { ESpeakingPart } from "@/types/Speaking";

interface Part3SessionProps {
  id: string;
}

export default function Part3Session({ id }: Part3SessionProps) {
  const router = useRouter();
  const sessionId = Number.parseInt(id, 10);

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
    part: ESpeakingPart.PART_3,
  });

  const [updateSessionResponses] = useUpdateSessionResponsesMutation();
  const [submitSession, { isLoading: isSubmitting }] =
    useSubmitSessionMutation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const answerMode = "text";

  useEffect(() => {
    if (sessionData) {
      const migratedResponses: Record<string, string> = {};

      if ("answers" in sessionData && sessionData.answers) {
        Object.entries(sessionData.answers).forEach(([qid, ans]) => {
          migratedResponses[qid] = ans as string;
        });
      } else if ("responses" in sessionData && sessionData.responses) {
        Object.entries(sessionData.responses).forEach(([qid, resp]) => {
          migratedResponses[qid] = resp as string;
        });
      }

      setResponses(migratedResponses);
    }
  }, [sessionData]);

  const getResponse = (questionId: string): string => {
    return responses[questionId] || "";
  };

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
    } catch (error) {
      console.error("Failed to save responses:", error);
    }
  };

  const nextQuestion = () => {
    if (!questions) return;
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      saveResponses().then(() => {
        router.push(`/learning/speaking/session/${id}/part-2`);
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await saveResponses();
      await submitSession({ sessionId }).unwrap();
      router.push(`/learning/speaking/result/${id}`);
    } catch (error) {
      console.error("Failed to submit session:", error);
    }
  };

  if (sessionLoading || questionsLoading || !sessionData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (sessionError || questionsError || !questions) {
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
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex-1 overflow-auto">
      <HeaderSkill
        title={sessionData.topic}
        description="Luyện tập kỹ năng nói IELTS - Part 3: Thảo luận chuyên sâu"
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
        <Tabs defaultValue="part-3" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="part-1"
              disabled={!sessionData.part.includes(ESpeakingPart.FULL)}
              onClick={() => {
                saveResponses().then(() => {
                  router.push(`/learning/speaking/session/${id}/part-1`);
                });
              }}
            >
              Part 1
            </TabsTrigger>
            <TabsTrigger
              value="part-2"
              disabled={!sessionData.part.includes(ESpeakingPart.FULL)}
              onClick={() => {
                saveResponses().then(() => {
                  router.push(`/learning/speaking/session/${id}/part-2`);
                });
              }}
            >
              Part 2
            </TabsTrigger>
            <TabsTrigger value="part-3">Part 3</TabsTrigger>
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

        <div className="lg:col-span-3">
          {currentQuestion && (
            <PartThreeQuestions
              question={{
                id: currentQuestion.id.toString(),
                text: currentQuestion.text,
                subQuestions: currentQuestion.subQuestions || [],
                followUp: currentQuestion.followUp
                  ? [currentQuestion.followUp]
                  : [],
              }}
              answer={getResponse(currentQuestion.id.toString())}
              onAnswerChange={(response) =>
                handleResponseChange(currentQuestion.id.toString(), response)
              }
              answerMode={answerMode}
            />
          )}

          {answerMode === "text" && currentQuestion && (
            <div className="mt-4">
              <Textarea
                placeholder="Nhập câu trả lời của bạn ở đây..."
                className="min-h-[150px]"
                value={getResponse(currentQuestion.id.toString())}
                onChange={(e) =>
                  handleResponseChange(
                    currentQuestion.id.toString(),
                    e.target.value
                  )
                }
              />
            </div>
          )}
          <div className="flex justify-between mt-4">
            <Button variant="secondary" onClick={prevQuestion}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Câu trước
            </Button>

            {isLastQuestion ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang nộp bài...
                  </>
                ) : (
                  <>
                    Hoàn thành & Nộp bài <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={nextQuestion}>
                Câu tiếp theo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
