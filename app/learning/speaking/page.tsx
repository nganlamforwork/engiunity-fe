import HeaderSkill from "@/components/pages/learning/HeaderSkill";
import { SpeakingTabsNavigation } from "@/components/pages/learning/practice/speaking/SpeakingNavigation";
import { SpeakingHomeTab } from "@/components/pages/learning/practice/speaking/SpeakingHomeTab";
import { Metadata } from "next";

// Mock data for practice sessions
const practiceSessions = [
  {
    id: "1",
    title: "The consumption of renewable energy in the USA",
    type: "Part 1",
    category: "Line Graph",
    description:
      "The diagram shows the consumption of renewable energy in the USA from 1949-2008. Write a 150-word report for...",
    completed: false,
    score: null,
    date: "2023-05-10T10:30:00Z",
  },
  {
    id: "2",
    title:
      "The changes in UK's birth rate for women in six different age groups",
    type: "Part 1",
    category: "Line Graph",
    description:
      "The chart below shows the changes in UK's birth rate for women in six different age groups from 1973 to 2008...",
    completed: true,
    score: 5.5,
    date: "2023-05-08T14:15:00Z",
  },
  {
    id: "3",
    title: "Describe a place you visited that impressed you",
    type: "Part 2",
    category: "Cue Card",
    description:
      "Describe a place you visited that impressed you. You should say: where it is, when you went there, what you did there, and explain why it impressed you.",
    completed: true,
    score: 6.0,
    date: "2023-05-05T09:45:00Z",
  },
  {
    id: "4",
    title: "The importance of environmental protection",
    type: "Part 3",
    category: "Discussion",
    description:
      "This topic explores various aspects of environmental protection, including government policies, individual responsibilities, and future challenges.",
    completed: false,
    score: null,
    date: "2023-05-01T16:20:00Z",
  },
];

// Mock data for history
const historyItems = [
  ...practiceSessions.filter((session) => session.completed),
  {
    id: "5",
    title: "Technology and its impact on society",
    type: "Part 3",
    category: "Discussion",
    description:
      "A discussion about how technology has changed society and its future implications.",
    completed: true,
    score: 7.0,
    date: "2023-04-28T11:30:00Z",
  },
  {
    id: "6",
    title: "Describe a skill you want to learn",
    type: "Part 2",
    category: "Cue Card",
    description:
      "Talk about a skill you want to learn, why you want to learn it, and how you plan to learn it.",
    completed: true,
    score: 6.5,
    date: "2023-04-25T13:45:00Z",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Practice statistics
const practiceStats = {
  totalSessions: 12,
  completedSessions: 8,
  averageScore: 6.2,
  highestScore: 7.5,
  recentImprovement: 0.5,
  weakestArea: "Vocabulary",
  strongestArea: "Idea Development",
};

export const metadata: Metadata = {
  title: "Speaking",
};

const SpeakingPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeaderSkill title={"Kĩ năng nói"} />
      <div>
        <SpeakingTabsNavigation />

        {/* Home Tab Content */}
        <div className="mt-6">
          <SpeakingHomeTab
            historyItems={historyItems}
            practiceStats={practiceStats}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
