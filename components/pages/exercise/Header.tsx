"use client";

import React from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EWritingPart } from "@/types/WritingExercise";
import { routes } from "@/utils/routes";
import { useSubmitWritingExerciseResponseMutation } from "@/store/api/writingExercisesApi";
interface HeaderProps {
  part?: EWritingPart | null;
  exerciseId?: number;
  answer?: string;
  responseId?: string;
}
const Header = ({ part, exerciseId, answer, responseId }: HeaderProps) => {
  const router = useRouter();
  const [submitResponse, { isLoading }] =
    useSubmitWritingExerciseResponseMutation();

  const handleSubmit = async () => {
    if (!answer?.trim()) {
      alert("Bạn chưa nhập nội dung bài viết.");
      return;
    }

    if (!exerciseId) {
      alert("Không xác định được đề bài.");
      return;
    }

    try {
      await submitResponse({
        id: exerciseId,
        data: {
          id: responseId,
          content: answer,
        },
      }).unwrap();

      router.push(routes.pages.learning.practice.writing.value);
    } catch (error) {
      console.error("Failed to submit response:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft size={16} /> Thoát
          </Button>
        </div>

        <div className="text-center">
          {part && (
            <h1 className="font-semibold uppercase">
              WRITING {part}
            </h1>
          )}
        </div>
        {exerciseId && (
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              "Đang nộp..."
            ) : (
              <>
                Nộp bài <ArrowRight size={16} />
              </>
            )}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
