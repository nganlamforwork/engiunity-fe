export enum ESpeakingPart {
  PART_1 = "Part 1",
  PART_2 = "Part 2",
  PART_3 = "Part 3",
  FULL = "Full",
}

export enum ESpeakingSessionStatus {
  INIT = "Init",
  CREATED = "Created",
  IN_PROGRESS = "In Progress",
  SUBMITTED = "Submitted",
  SCORED = "Scored",
}

// Backend question type
export interface SpeakingQuestion {
  id: number;
  part: ESpeakingPart;
  order: number;
  text: string; // This is the main question text
  subQuestions?: string[];
  cueCard?: string[];
  followUp?: string;
  response: SpeakingResponse;
}

// Backend session type
export interface SpeakingSession {
  id: number;
  status: ESpeakingSessionStatus;
  topic: string;
  notes?: string;
  part: ESpeakingPart;
  createdAt?: string;
  updatedAt?: string;
}

// Frontend question type (for UI rendering)
export interface Question {
  id: string;
  text: string;
  subQuestions?: string[];
  cueCard?: string[];
  followUp?: string[];
  response?: string;
}

// DTO for creating a new speaking session
export interface CreateSpeakingSessionDto {
  topic: string;
  notes?: string;
  part: ESpeakingPart;
}

// Grading interfaces
export interface CriteriaGrading {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface GradingResult {
  ideaDevelopment: CriteriaGrading;
  vocabulary: CriteriaGrading;
  grammar: CriteriaGrading;
  coherence: CriteriaGrading;
  overallFeedback: string;
  sampleAnswers: Record<string, string>;
  keyVocabulary: Record<string, string[]>;
}
export interface SpeakingResponse {
  id?: number;
  questionId: number;
  transcript: string;
  audioUrl?: string;
}
