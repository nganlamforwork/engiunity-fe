"use client";

import React from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EWritingPart, IExerciseSummaryItem } from "@/types/WritingExercise";
import Link from "next/link";
import { routes } from "@/utils/routes";

interface HeaderProps {
  exercise?: IExerciseSummaryItem;
}

const Header = ({ exercise }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft size={16} /> Trở về trang trước
          </Button>
        </div>

        <div className="text-center">
          {exercise && (
            <h1 className="font-semibold uppercase">
              WRITING RESULT {exercise.part}
            </h1>
          )}
        </div>
        <Link
          href={routes.pages.exercises.writing.value + `/${exercise?.id || 0}`}
        >
          <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
            Làm lại <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
