"use client";

import Link from "next/link";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Home } from "lucide-react";
import { GradingResult, Session } from "@/types/Speaking";
import { GradingResults } from "./grading-result";
import { SampleAnswer } from "./sample-answer";
import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { routes } from "@/utils/routes";
import { CircularProgress } from "@/components/customized/progress/progress-09";

interface ResultsProps {
  id: string;
}
export default function Result({ id }: ResultsProps) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [results, setResults] = useState<GradingResult | null>(null);

  useEffect(() => {
    // In a real app, we would fetch this from an API
    const sessionData = localStorage.getItem(`session_${id}`);
    const resultsData = localStorage.getItem(`results_${id}`);

    if (sessionData && resultsData) {
      setSession(JSON.parse(sessionData));
      setResults(JSON.parse(resultsData));
    } else {
      router.push("/speaking");
    }
  }, [id, router]);

  if (!session || !results) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading results...</p>
      </div>
    );
  }

  const overallScore =
    (results.ideaDevelopment.score +
      results.vocabulary.score +
      results.grammar.score +
      results.coherence.score) /
    4;

  return (
    <div className="flex-1 overflow-auto">
      <HeaderSkill
        title={"Kết quả bài tập: " + session.topic}
        description="Xem đánh giá chi tiết và các gợi ý cải thiện"
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
      <div className="mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tổng quan kết quả</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <CircularProgress
                    value={overallScore}
                    size={120}
                    strokeWidth={12}
                    showLabel
                    labelClassName="text-md font-bold"
                    renderLabel={() => overallScore}
                  />
                  <p className="mt-4 text-center font-medium">
                    {overallScore >= 7.5
                      ? "Xuất sắc"
                      : overallScore >= 6.5
                      ? "Tốt"
                      : overallScore >= 5.5
                      ? "Khá"
                      : "Cần cải thiện"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Phát triển ý tưởng</span>
                    <span className="font-medium">
                      {results.ideaDevelopment.score.toFixed(1)}/9
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Từ vựng</span>
                    <span className="font-medium">
                      {results.vocabulary.score.toFixed(1)}/9
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ngữ pháp</span>
                    <span className="font-medium">
                      {results.grammar.score.toFixed(1)}/9
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mạch lạc</span>
                    <span className="font-medium">
                      {results.coherence.score.toFixed(1)}/9
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Nhận xét tổng quan</h3>
                  <p className="text-sm">{results.overallFeedback}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full " asChild>
                  <Link href="/learning/speaking/new">Bài tập mới</Link>
                </Button>
                <Button variant="ghost" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Tải báo cáo
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="grading" className="w-full lg:col-span-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grading">Đánh giá & Nhận xét</TabsTrigger>
              <TabsTrigger value="sample">Câu trả lời mẫu</TabsTrigger>
            </TabsList>

            <TabsContent value="grading" className="mt-4">
              <GradingResults results={results} />
            </TabsContent>

            <TabsContent value="sample" className="mt-4">
              <SampleAnswer session={session} results={results} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
