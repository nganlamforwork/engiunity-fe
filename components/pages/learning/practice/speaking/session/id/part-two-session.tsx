"use client";

import { useEffect } from "react";
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
} from "@/store/api/speakingSessionApi";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setCurrentQuestionIndex,
  updateAnswer,
  setSession,
  setCurrentStep,
} from "@/store/slice/speakingSessionSlice";
import { ESpeakingPart } from "@/types/Speaking";

interface Part2SessionProps {
  id: string;
}

export default function Part2Session({ id }: Part2SessionProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get session state from Redux
  const { currentSession } = useAppSelector((state) => state.speakingSession);
  const currentQuestionIndex = currentSession?.currentQuestionIndex || 0;
  const answerMode = "text"; // Default to text mode

  // Parse the ID to a number for the API
  const sessionId = Number.parseInt(id, 10);

  // Fetch session data from API
  const {
    data: sessionData,
    isLoading: sessionLoading,
    isError: sessionError,
  } = useGetSpeakingSessionQuery({ id: sessionId });

  // Fetch questions from the API
  const {
    data: questions,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useGetQuestionsQuery({
    sessionId,
    part: ESpeakingPart.PART_2,
  });

  // Initialize session in Redux when data is loaded
  useEffect(() => {
    if (sessionData && !currentSession) {
      dispatch(setSession(sessionData));
      dispatch(setCurrentStep(2)); // Set to Part 2
      dispatch(setCurrentQuestionIndex(0)); // Reset question index
    } else if (currentSession && currentSession.currentStep !== 2) {
      dispatch(setCurrentStep(2)); // Update to Part 2
      dispatch(setCurrentQuestionIndex(0)); // Reset question index
    }
  }, [sessionData, currentSession, dispatch]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    dispatch(updateAnswer({ questionId, answer }));
  };

  const nextQuestion = () => {
    if (!questions) return;

    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      // Move to Part 3
      dispatch(setCurrentStep(3));
      dispatch(setCurrentQuestionIndex(0));
      router.push(`/learning/speaking/session/${id}/part-3`);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));
    } else {
      // Go back to Part 1
      router.push(`/learning/speaking/session/${id}/part-1`);
    }
  };

  // Show loading state while fetching session or questions
  if (sessionLoading || questionsLoading || !currentSession) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Handle error state
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

  // Calculate progress
  const totalQuestions = questions.length;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex-1 overflow-auto">
      <HeaderSkill
        title={currentSession.topic}
        description="Luyện tập kỹ năng nói IELTS - Part 2: Nói dài (Cue card)"
        topElements={
          <Button
            variant="ghost"
            onClick={() => {
              return router.push(routes.pages.learning.speaking.new.value);
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
              disabled={!currentSession.part.includes(ESpeakingPart.FULL)}
              onClick={() =>
                router.push(`/learning/speaking/session/${id}/part-1`)
              }
            >
              Part 1
            </TabsTrigger>
            <TabsTrigger value="part-2">Part 2</TabsTrigger>
            <TabsTrigger
              value="part-3"
              disabled={!currentSession.part.includes(ESpeakingPart.FULL)}
              onClick={() =>
                router.push(`/learning/speaking/session/${id}/part-3`)
              }
            >
              Part 3
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6">
          <div className="flex justify-start items-center mb-2">
            <span className="text-sm font-medium">
              Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-gray-100" />
        </div>

        <div>
          {currentQuestion && (
            <PartTwoPrompt
              question={{
                id: currentQuestion.id.toString(),
                text: currentQuestion.text,
                subQuestions: currentQuestion.subQuestions || [],
                cueCard: currentQuestion.cueCard || [],
              }}
              answer={
                currentSession.answers[currentQuestion.id.toString()] || ""
              }
              onAnswerChange={(answer) =>
                handleAnswerChange(currentQuestion.id.toString(), answer)
              }
              answerMode={answerMode}
            />
          )}

          {answerMode === "text" && currentQuestion && (
            <div className="mt-4">
              <Textarea
                placeholder="Nhập câu trả lời của bạn ở đây..."
                className="min-h-[150px]"
                value={
                  currentSession.answers[currentQuestion.id.toString()] || ""
                }
                onChange={(e) =>
                  handleAnswerChange(
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

            <Button onClick={nextQuestion}>
              {isLastQuestion ? "Phần tiếp theo" : "Câu tiếp theo"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
