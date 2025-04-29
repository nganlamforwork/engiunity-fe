export interface IExerciseItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  creationSource: ECreationSource;
  part: EWritingPart;
  exerciseType?: EWritingExerciseType;
  difficulty?: EDifficulty;
  status: EStatus;
  score: number;
  content: string;
  image?: string;
}

export interface IExerciseSummaryItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  creationSource: ECreationSource;
  part: EWritingPart;
  exerciseType?: EWritingExerciseType;
  difficulty?: EDifficulty;
  status: EStatus;
  score: number;
  image?: string;
}

export interface CreateExerciseDto {
  title: string;
  description?: string;
  thumbnail?: string;
  creationSource: ECreationSource;
  part: EWritingPart;
  exerciseType?: EWritingExerciseType;
  difficulty?: EDifficulty;
  content: string;
  image?: string;
}
export interface CreateExerciseResponseDto {
  id?: string;
  content: string;
}
export interface ExerciseResponseNotScoredDto {
  id: string;
  content: string;
}

export enum EStatus {
  COMPLETED = "Completed",
  IN_PROGRESS = "In Progress",
  NOT_STARTED = "Not Started",
}

export enum ECreationSource {
  USER_CREATED = "USER_CREATED",
  AI_GENERATED = "AI_GENERATED",
  SYSTEM_UPLOADED = "SYSTEM_UPLOADED",
}

export enum EDifficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export enum EWritingExerciseType {
  LINE_GRAPH = "Line Graph",
  BAR_CHART = "Bar Chart",
  PIE_CHART = "Pie Chart",
  TABLE = "Table",
  PROCESS = "Process Diagram",
  MAP = "Map",
  MIXED_CHART = "Mixed Chart",
  OPINION_ESSAY = "Opinion Essay",
  DISCUSSION_ESSAY = "Discussion Essay",
  PROBLEM_SOLUTION_ESSAY = "Problem & Solution Essay",
  ADVANTAGE_DISADVANTAGE_ESSAY = "Advantage & Disadvantage Essay",
  TWO_PART_QUESTION = "Two-part Question Essay",
}
export enum EWritingPart {
  PART_1 = "Part 1",
  PART_2 = "Part 2",
}
