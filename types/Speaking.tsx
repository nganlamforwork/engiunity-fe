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
export enum EScoreStatus {
  NOT_SCORED = "Chưa chấm",
  IN_PROGRESS = "Đang chấm",
  SCORED = "Đã chấm",
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
export interface SpeakingResponse {
  id?: number;
  questionId: number;
  transcript: string;
  audioUrl?: string;
}
export interface SpeakingEvaluation {
  id?: number;
  score: number;
  scoreStatus: EScoreStatus;
  scoreDetail: Evaluation;
  speakingSession: SpeakingSession;
}

export interface Evaluation {
  overview: Overview;
  fluency_and_coherence: Criteria;
  lexical_resource: Criteria;
  grammatical_range_and_accuracy: Criteria;
  pronunciation: Criteria;
  model: string;
}

export interface Overview {
  totalScore: number;
  overallFeedback: string;
  overallImprovementSuggestion: string;
}

export interface Criteria {
  score: number;
  feedback: string;
  examples: Example[];
  improvementSuggestion: string;
}
export interface Example {
  excerpt: string;
  comment: string;
}
