export interface IExerciseItem {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "not-started";
  score: number;
  tags: string[];
  type: "system-uploaded" | "user-uploaded" | "ai-generated";
  url?: string;
}
