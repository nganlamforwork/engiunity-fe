export interface VocabularyWord {
  word: string;
  type: string;
  level: string;
  synonyms: string[];
  example: string;
  vietnameseTranslation: string;
  ipa: string;
}

export interface VocabularySession {
  id: string;
  topic?: string;
  level?: string;
  date: string;
  words: VocabularyWord[];
  paragraph?: string;
  writing?: string;
  feedback?: string;
  improvedAnswer?: string;
  status: string;
}

export interface VocabularyItemDto {
  id: number;
  sessionId: number;
  word: string;
  vietnameseTranslation: string;
  example: string;
  level: string;
  topic: string;
}

export interface SessionDto {
  id: number;
  topic: string;
  level: string;
  status: string;
}

export interface WritingStepData {
  writing: string;
  feedback: string;
  improvedAnswer: string;
}
