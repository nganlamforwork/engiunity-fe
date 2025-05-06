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
import { PartOneQuestions } from "@/components/pages/learning/practice/speaking/session/id/part-one-questions";
import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { routes } from "@/utils/routes";

interface Part1SessionProps {
  id: string;
}
export default function Part1Session({ id }: Part1SessionProps) {
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

      // Restore current question index if it exists
      if (parsedSession.currentQuestionIndex !== undefined) {
        setCurrentQuestionIndex(parsedSession.currentQuestionIndex);
      }

      setIsLoading(false);
    } else {
      router.push("/practice");
    }
  }, [id, router]);

  const updateSession = (updates: Partial<Session>) => {
    if (!session) return;

    const updatedSession = { ...session, ...updates };
    localStorage.setItem(`session_${id}`, JSON.stringify(updatedSession));
    setSession(updatedSession);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (!session) return;

    const updatedAnswers = { ...session.answers, [questionId]: answer };
    updateSession({ answers: updatedAnswers });
  };

  const nextQuestion = () => {
    if (!session) return;

    const questions = session.questions.part1;

    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      updateSession({ currentQuestionIndex: newIndex });
    } else {
      // Move to Part 2
      updateSession({ currentStep: 2, currentQuestionIndex: 0 });
      router.push(`/practice/session/${id}/part2`);
    }
  };

  const prevQuestion = () => {
    if (!session || currentQuestionIndex === 0) return;

    const newIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(newIndex);
    updateSession({ currentQuestionIndex: newIndex });
  };

  if (isLoading || !session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentQuestion = session.questions.part1[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === session.questions.part1.length - 1;

  // Calculate progress
  const totalQuestions = session.questions.part1.length;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex-1 overflow-auto">
      <HeaderSkill
        title={session.topic}
        description="Luyện tập kỹ năng nói IELTS - Part 1: Giới thiệu và câu hỏi chung"
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
        <Tabs defaultValue="part1" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="part1">Part 1</TabsTrigger>
            <TabsTrigger
              value="part2"
              disabled={!session.practiceType.includes("full")}
              onClick={() => router.push(`/practice/session/${id}/part2`)}
            >
              Part 2
            </TabsTrigger>
            <TabsTrigger
              value="part3"
              disabled={!session.practiceType.includes("full")}
              onClick={() => router.push(`/practice/session/${id}/part3`)}
            >
              Part 3
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {session.topic}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-gray-100" />
        </div>

        <div>
          {currentQuestion && (
            <PartOneQuestions
              question={currentQuestion}
              answer={session.answers[currentQuestion.id] || ""}
              onAnswerChange={(answer) =>
                handleAnswerChange(currentQuestion.id, answer)
              }
            />
          )}

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
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="secondary"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
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
  );
}
