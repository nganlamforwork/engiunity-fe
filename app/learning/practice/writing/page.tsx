import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { Metadata } from "next";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/pages/learning/Tabs";
import LessonTab from "@/components/pages/learning/practice/writing/LessonTab";
import ExerciseTab from "@/components/pages/learning/practice/writing/ExerciseTab";

export const metadata: Metadata = {
  title: "Writing",
};

const WritingPage = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 rounded">
        <HeaderSkill title={"Kĩ năng viết"} />
        <Tabs tabs={tabItems} defaultValue="lesson" />
      </div>
      <Skeleton className="w-full h-[250px] col-span-1 " />
    </div>
  );
};

export default WritingPage;

const tabItems = [
  {
    label: "Bài học",
    value: "lesson",
    content: <LessonTab />,
  },
  {
    label: "Bài tập",
    value: "exercise",
    content: <ExerciseTab />,
  },
];
