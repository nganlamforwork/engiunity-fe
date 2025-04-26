import { Button } from "@/components/ui/button";
import { ListFilter, Sparkles } from "lucide-react";
import ExerciseCard from "../../ExerciseCard";
import { IExerciseItem } from "@/types/IExercise";

const ExerciseTab = () => {
  return (
    <div className="mt-4">
      {/* Header & Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon">
            <ListFilter />
          </Button>
          <div>
            <p className="text-xl font-semibold">Danh sách các bài tập</p>
            <p className="text-sm text-muted-foreground">Đã làm 0/12 bài</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Tự thêm bài tập</Button>
          <Button variant="brandAccent">
            <Sparkles /> Bài tập mới
          </Button>
        </div>
      </div>

      {/* Exercise List */}
      <div className="mt-4 flex flex-col gap-4">
        {exerciseData.map((exercise) => (
          <ExerciseCard key={exercise.id} data={exercise} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseTab;

const exerciseData: IExerciseItem[] = [
  {
    id: "1",
    thumbnail: "/landscape-placeholder.svg?height=200&width=200",
    title: "Urban Population Trends in Four Asian Countries (1970-2040)",
    description:
      "A line graph showing the percentage of people living in cities across four Asian countries from 1970 to 2020, with future projections for 2030 and 2040.",
    status: "not-started",
    score: 0,
    tags: ["Data Analysis", "Geography", "Demographics"],
    topics: [],
    type: "system-uploaded",
  },
  {
    id: "2",
    thumbnail: "/landscape-placeholder.svg?height=200&width=200",
    title: "Global Warming Impact Assessment",
    description:
      "Analyze the effects of climate change on different regions and propose sustainable solutions.",
    status: "in-progress",
    score: 45,
    tags: ["Climate", "Environment", "Research"],
    topics: [],
    type: "user-uploaded",
  },
  {
    id: "3",
    thumbnail: "/landscape-placeholder.svg?height=200&width=200",
    title: "Economic Growth Patterns in Southeast Asia",
    description:
      "Explore the economic development trends across Southeast Asian countries from 2000 to 2022.",
    status: "completed",
    score: 92,
    tags: ["Economics", "Asia", "Development"],
    topics: [],
    type: "ai-generated",
  },
];
