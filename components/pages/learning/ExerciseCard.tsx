"use client";
import { Card } from "@/components/ui/card";
import { IExerciseItem } from "@/types/IExercise";
import Link from "next/link";
import Image from "next/image";
import { CircularProgress } from "@/components/customized/progress/progress-09";
import { Badge } from "@/components/ui/badge";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
  data: IExerciseItem;
  className?: string;
}
const ExerciseCard = ({ data, className }: ExerciseCardProps) => {
  const typeConfig = {
    "ai-generated": {
      icon: <Sparkles size={16} />,
      color: "text-brand-primary",
    },
    "user-uploaded": {
      icon: <User size={16} />,
      color: "",
    },
    "system-uploaded": {
      icon: null,
      color: "",
    },
  };
  return (
    <Link href={data.url || "/"}>
      <Card className="hover:shadow-lg cursor-pointer overflow-hidden shadow-none transition-all ">
        <div className="flex flex-col sm:flex-row">
          <Image
            src={
              data.thumbnail ||
              "/landscape-placeholder.svg?height=200&width=200"
            }
            alt={data.title}
            width={200}
            height={200}
          />
          <div className="w-full p-4 flex items-center gap-4">
            <div className="w-full h-full">
              <div className="flex flex-wrap gap-2 mb-2">
                {data.type != "system-uploaded" && (
                  <div
                    className={cn(
                      "flex items-center",
                      typeConfig[data.type].color || ""
                    )}
                  >
                    <span className="mr-1">{typeConfig[data.type].icon}</span>
                  </div>
                )}

                {data.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {data.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {data.description}
              </p>
            </div>
            <div>
              <CircularProgress
                value={70}
                size={120}
                strokeWidth={12}
                showLabel
                labelClassName="text-md font-bold"
                renderLabel={(progress) => `${progress}%`}
              />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ExerciseCard;
