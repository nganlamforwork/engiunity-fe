"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Session } from "@/types/Speaking";
import { PartTwoPrompt } from "./part-two-prompt";
import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { routes } from "@/utils/routes";

interface Part2SessionProps {
  id: string;
}
export default function Part2Session({ id }: Part2SessionProps) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [answerMode, setAnswerMode] = useState<"text" | "chat">("text");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch this from an API
    const sessionData = localStorage.getItem(`session_${id}`);
    if (sessionData) {
      const parsedSession = JSON.parse(sessionData);
      setSession(parsedSession);

      // If we're coming from part-1, reset the question index
      if (parsedSession.currentStep !== 2) {
        updateSession({
          ...parsedSession,
          currentStep: 2,
          currentQuestionIndex: 0,
        });
      } else if (parsedSession.currentQuestionIndex !== undefined) {
        setCurrentQuestionIndex(parsedSession.currentQuestionIndex);
      }

      setIsLoading(false);
    } else {
      router.push("/learning/speaking");
    }
  }, [id, router]);

  const updateSession = (updatedSession: Session) => {
    localStorage.setItem(`session_${id}`, JSON.stringify(updatedSession));
    setSession(updatedSession);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (!session) return;

    const updatedAnswers = { ...session.answers, [questionId]: answer };
    updateSession({ ...session, answers: updatedAnswers });
  };

  const nextQuestion = () => {
    if (!session) return;

    const questions = session.questions.part2;

    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      updateSession({ ...session, currentQuestionIndex: newIndex });
    } else {
      // Move to Part 3
      updateSession({ ...session, currentStep: 3, currentQuestionIndex: 0 });
      router.push(`/learning/speaking/session/${id}/part-3`);
    }
  };

  const prevQuestion = () => {
    if (!session) return;

    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      updateSession({ ...session, currentQuestionIndex: newIndex });
    } else {
      // Go back to Part 1
      router.push(`/learning/speaking/session/${id}/part-1`);
    }
  };

  if (isLoading || !session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentQuestion = session.questions.part2[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === session.questions.part2.length - 1;

  // Calculate progress
  const totalQuestions = session.questions.part2.length;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex-1 overflow-auto">
      <HeaderSkill
        title={session.topic}
        description="
          Luyện tập kỹ năng nói IELTS - Part 2: Nói dài (Cue card)"
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
              disabled={!session.part.includes("full")}
              onClick={() =>
                router.push(`/learning/speaking/session/${id}/part-1`)
              }
            >
              Part 1
            </TabsTrigger>
            <TabsTrigger value="part-2">Part 2</TabsTrigger>
            <TabsTrigger
              value="part-3"
              disabled={!session.part.includes("full")}
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
              question={currentQuestion}
              answer={session.answers[currentQuestion.id] || ""}
              onAnswerChange={(answer) =>
                handleAnswerChange(currentQuestion.id, answer)
              }
              answerMode={answerMode}
            />
          )}

          {answerMode === "text" && currentQuestion && (
            <div className="mt-4">
              <Textarea
                placeholder="Nhập câu trả lời của bạn ở đây..."
                className="min-h-[150px]"
                value={session.answers[currentQuestion.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion.id, e.target.value)
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
