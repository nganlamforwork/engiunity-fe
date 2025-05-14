import { ExpandCard } from "./components/ExpandTab";
import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { HistoryCard } from "./components/HistoryTab";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/pages/learning/Tabs";

const WordExpansion = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 rounded">
        <HeaderSkill title={"Word Expansion"} />
        <Tabs tabs={tabItems} defaultValue="expand" />
      </div>
      <Skeleton className="w-full h-[250px] col-span-1 " />
    </div>
  );
};

export default WordExpansion;

const tabItems = [
  {
    label: "Tìm kiếm",
    value: "expand",
    content: <ExpandCard />,
  },
  {
    label: "Lịch sử",
    value: "history",
    content: <HistoryCard />,
  },
];
