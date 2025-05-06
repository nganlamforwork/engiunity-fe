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
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="bg-blue-50 p-8 relative">
            <Button
              variant="outline"
              className="mb-4"
              onClick={() => router.push("/practice")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
            </Button>
            <h1 className="text-2xl font-bold text-blue-600">
              {session.topic}
            </h1>
            <p className="text-blue-600/80 mt-1">
              Luyện tập kỹ năng nói IELTS - Part 1: Giới thiệu và câu hỏi chung
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-6">
            <Tabs defaultValue="part1" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="part1"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  Part 1
                </TabsTrigger>
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
              <Progress
                value={progressPercentage}
                className="h-2 bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Thông tin bài tập
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium text-sm">Chủ đề</h3>
                      <p className="text-sm">{session.topic}</p>
                    </div>

                    {session.notes && (
                      <div>
                        <h3 className="font-medium text-sm">Ghi chú</h3>
                        <p className="text-sm text-muted-foreground">
                          {session.notes}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="font-medium text-sm">Chế độ trả lời</h3>
                      <RadioGroup
                        value={answerMode}
                        onValueChange={(value) =>
                          setAnswerMode(value as "text" | "chat")
                        }
                        className="mt-2 flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="text" id="text" />
                          <Label htmlFor="text" className="text-sm">
                            Văn bản
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="chat" id="chat" />
                          <Label htmlFor="chat" className="text-sm">
                            Hội thoại
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Câu hỏi {currentQuestionIndex + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentQuestion && (
                      <PartOneQuestions
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
                            handleAnswerChange(
                              currentQuestion.id,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}

                    {answerMode === "chat" && currentQuestion && (
                      <h1>Coming soon...</h1>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Câu trước
                    </Button>

                    <Button
                      onClick={nextQuestion}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      {isLastQuestion ? "Phần tiếp theo" : "Câu tiếp theo"}{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
