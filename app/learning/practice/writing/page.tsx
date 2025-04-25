import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { Metadata } from "next";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/pages/learning/Tabs";

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
    content: <div>Nội dung bài học ở đây</div>,
  },
  {
    label: "Bài tập",
    value: "exercise",
    content: <div>Nội dung bài tập ở đây</div>,
  },
];
