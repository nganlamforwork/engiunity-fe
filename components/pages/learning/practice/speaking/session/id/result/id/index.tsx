"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download } from "lucide-react";
import { GradingResults } from "./grading-result";
import { SampleAnswer } from "./sample-answer";
import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { routes } from "@/utils/routes";
import { CircularProgress } from "@/components/customized/progress/progress-09";
import { useGetResultQuery } from "@/store/api/speakingSessionApi";
import { useRouter } from "next/navigation";

interface ResultsProps {
  id: string;
}

export default function Result({ id }: ResultsProps) {
  const router = useRouter();
  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useGetResultQuery({ id: Number(id) });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading results...</p>
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Error</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No results found.</p>
      </div>
    );
  }

  const { speakingSession, score, scoreStatus, scoreDetail } = result;
  const overallScore = score || 0;
  const session = speakingSession;

  return (
    <div className="flex-1 overflow-auto">
      <HeaderSkill
        title={"Kết quả bài tập: " + session.topic}
        description="Xem đánh giá chi tiết và các gợi ý cải thiện"
        topElements={
          <Button
            variant="ghost"
            onClick={() => {
              return router.push(routes.pages.learning.speaking.value);
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
                      {scoreDetail.fluency_and_coherence.score.toFixed(1)}/9
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mạch lạc</span>
                    <span className="font-medium">
                      {scoreDetail.lexical_resource.score.toFixed(1)}/9
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ngữ pháp</span>
                    <span className="font-medium">
                      {scoreDetail.grammatical_range_and_accuracy.score.toFixed(
                        1
                      )}
                      /9
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phát âm</span>
                    <span className="font-medium">
                      {scoreDetail.pronunciation.score.toFixed(1)}/9
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Nhận xét tổng quan</h3>
                  <p className="text-sm">
                    {scoreDetail.overview.overallFeedback}
                  </p>
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
              <TabsTrigger value="sample">Bài mẫu</TabsTrigger>
            </TabsList>

            <TabsContent value="grading" className="mt-4">
              <GradingResults results={result} />
            </TabsContent>

            <TabsContent value="sample" className="mt-4">
              <SampleAnswer session={session} results={result} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
