export interface Question {
  id: string;
  text: string;
  subQuestions?: string[];
  cueCard?: string[];
  followUp?: string[];
}

export interface Session {
  id: string;
  topic: string;
  notes?: string;
  timestamp: string;
  questions: {
    part1: Question[];
    part2: Question[];
    part3: Question[];
  };
  currentStep?: number;
  currentQuestionIndex?: number;
  answers: Record<string, string>;
}

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
