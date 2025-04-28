"use client";

import React from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { EWritingPart } from "@/types/WritingExercise";
interface HeaderProps {
  part?: EWritingPart | null;
}
const Header = ({ part }: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between h-16">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft size={16} /> Thoát
          </Button>
        </div>

        <div className="text-center">
          {part && <h1 className="font-semibold uppercase">WRITING {part}</h1>}
        </div>
        <Button>
          Nộp bài <ArrowRight size={16} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
