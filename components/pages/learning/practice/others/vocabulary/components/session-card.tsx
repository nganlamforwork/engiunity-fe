import { Card } from "@/components/ui/card";
import { SessionDto } from "@/types/type";

export default function SessionCard({ session }: { session: SessionDto }) {
  const getProgressPercentage = () => {
    if (session.status === "COMPLETED") return 100;
    if (session.status === "READING") return 75;
    if (session.status === "PARAGRAPH_GENERATE") return 50;
    if (session.status === "VOCABULARY_GENERATE") return 25;
    return 0;
  };

  const progress = getProgressPercentage();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-lg">
              {session.topic || "New Session"}
              {session.level && ` (${session.level})`}
            </h3>
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
      </div>
    </Card>
  );
}
