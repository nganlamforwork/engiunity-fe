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
    <div className="flex flex-col gap-4">
      <HeaderSkill title={"Kĩ năng viết"} />
      <Tabs tabs={tabItems} defaultValue="lesson" />
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
