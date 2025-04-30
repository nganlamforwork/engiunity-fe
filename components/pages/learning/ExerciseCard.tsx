"use client";
import { Card } from "@/components/ui/card";
import {
  ECreationSource,
  EStatus,
  IExerciseSummaryItem,
} from "@/types/WritingExercise";
import Link from "next/link";
import Image from "next/image";
import { CircularProgress } from "@/components/customized/progress/progress-09";
import { Badge } from "@/components/ui/badge";
import { FileText, PenLine, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { routes } from "@/utils/routes";
import { Button } from "@/components/ui/button";

interface ExerciseCardProps {
  data: IExerciseSummaryItem;
  className?: string;
}

const ExerciseCard = ({ data, className }: ExerciseCardProps) => {
  const typeConfig = {
    [ECreationSource.AI_GENERATED]: {
      icon: <Sparkles size={16} />,
      color: "text-brand-primary",
    },
    [ECreationSource.USER_CREATED]: {
      icon: <User size={16} />,
      color: "",
    },
    [ECreationSource.SYSTEM_UPLOADED]: {
      icon: null,
      color: "",
    },
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden shadow-none group cursor-pointer",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row">
        <Image
          src={
            data.thumbnail ||
            data.image ||
            "/landscape-placeholder.svg?height=200&width=200" ||
            "/placeholder.svg"
          }
          alt={data.title}
          width={200}
          height={200}
        />
        <div className="w-full p-4 flex items-center gap-4">
          <div className="w-full h-full">
            <div className="flex flex-wrap gap-2 mb-2">
              {data.creationSource !== ECreationSource.SYSTEM_UPLOADED && (
                <div
                  className={cn(
                    "flex items-center",
                    typeConfig[data.creationSource].color || ""
                  )}
                >
                  <span className="mr-1">
                    {typeConfig[data.creationSource].icon}
                  </span>
                </div>
              )}

              <Badge variant="secondary" className="text-xs">
                {data.part}
              </Badge>
              {data.exerciseType && (
                <Badge variant="secondary" className="text-xs">
                  {data.exerciseType}
                </Badge>
              )}

              {data.difficulty && (
                <Badge variant="secondary" className="text-xs">
                  {data.difficulty}
                </Badge>
              )}
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
              value={
                data.status === EStatus.NOT_STARTED
                  ? 0
                  : data.status === EStatus.IN_PROGRESS
                  ? 50
                  : 100
              }
              size={120}
              strokeWidth={12}
              showLabel
              labelClassName="text-md font-bold"
              renderLabel={() => {
                if (data.status === EStatus.NOT_STARTED)
                  return (
                    <span className="text-center">
                      Chưa
                      <br />
                      làm
                    </span>
                  );
                if (data.status === EStatus.IN_PROGRESS)
                  return (
                    <span className="text-center">
                      Đang
                      <br />
                      làm
                    </span>
                  );
                return `${data.score || 0}`;
              }}
            />
          </div>
        </div>
      </div>

      {/* Overlay with buttons */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <Link
          href={
            routes.pages.exercises.writing.value + `/${data.id}` + "/results"
          }
        >
          <Button variant="secondary" className="flex items-center gap-2">
            <FileText size={16} />
            Xem kết quả
          </Button>
        </Link>
        <Link href={routes.pages.exercises.writing.value + `/${data.id}`}>
          <Button className="flex items-center gap-2">
            <PenLine size={16} />
            Làm bài tập
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ExerciseCard;
