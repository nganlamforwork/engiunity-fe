export interface Expansions {
  level: string;
  description: string;
  synonym: string;
  sentence: string;
  notes: string;
}

export interface WordExpansionData {
  word: string;
  expansions: Expansions[];
}

// IELTS level descriptions
export const ieltsLevelDescriptions = {
  A1: "Beginner - Basic words for everyday communication",
  A2: "Elementary - Simple vocabulary for familiar situations",
  B1: "Intermediate - Common vocabulary for work and leisure",
  B2: "Upper Intermediate - Clear vocabulary for complex topics",
  C1: "Advanced - Precise vocabulary for academic and professional contexts",
  C2: "Proficient - Sophisticated vocabulary with nuanced meanings",
};
