"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart,
  Calendar,
  Headphones,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Mic,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { routes } from "@/utils/routes";

interface Session {
  id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  completed: boolean;
  score: number | null;
  date: string;
}

interface PracticeStats {
  totalSessions: number;
  completedSessions: number;
  averageScore: number;
  highestScore: number;
  recentImprovement: number;
  weakestArea: string;
  strongestArea: string;
}

interface SpeakingHomeTabProps {
  historyItems: Session[];
  practiceStats: PracticeStats;
}

export function SpeakingHomeTab({
  historyItems,
  practiceStats,
}: SpeakingHomeTabProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-blue-500" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Completed Sessions</span>
                  <span className="font-medium">
                    {practiceStats.completedSessions}/
                    {practiceStats.totalSessions}
                  </span>
                </div>
                <Progress
                  value={
                    (practiceStats.completedSessions /
                      practiceStats.totalSessions) *
                    100
                  }
                  className="h-2"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Score</span>
                <span className="font-bold text-lg">
                  {practiceStats.averageScore.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Highest Score</span>
                <span className="font-bold text-lg">
                  {practiceStats.highestScore.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Recent Improvement</span>
                <span className="text-green-500 font-medium">
                  +{practiceStats.recentImprovement.toFixed(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ListChecks className="mr-2 h-5 w-5 text-blue-500" />
              Strengths & Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Strongest Area</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>{practiceStats.strongestArea}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Needs Improvement</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span>{practiceStats.weakestArea}</span>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/speaking/analytics">
                    View Detailed Analytics
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historyItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {item.score ? item.score.toFixed(1) : "—"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/learning/speaking/history">
                    View All History
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Rest of the component remains the same */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">
          IELTS Speaking Practice Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="mr-2 h-5 w-5 text-blue-500" />
                Part 1: Introduction & Interview
              </CardTitle>
              <CardDescription>4-5 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                In this part, the examiner introduces themselves and asks you to
                introduce yourself. They will ask general questions on familiar
                topics such as home, family, work, studies, and interests.
              </p>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Tips:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Give extended answers (2-3 sentences)</li>
                  <li>Use a variety of vocabulary and grammar structures</li>
                  <li>Speak clearly and confidently</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                Part 2: Individual Long Turn
              </CardTitle>
              <CardDescription>3-4 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The examiner gives you a task card with a topic and some points
                to include in your talk. You have 1 minute to prepare and then
                you'll speak for 1-2 minutes on the topic.
              </p>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Tips:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Use your preparation time effectively</li>
                  <li>Cover all points on the cue card</li>
                  <li>
                    Structure your talk with an introduction, body, and
                    conclusion
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Headphones className="mr-2 h-5 w-5 text-blue-500" />
                Part 3: Two-way Discussion
              </CardTitle>
              <CardDescription>4-5 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                The examiner will ask further questions connected to the topic
                in Part 2. These questions require more in-depth responses and
                abstract thinking.
              </p>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Tips:</h4>
                <ul className="text-sm space-y-1 list-disc pl-5">
                  <li>Develop your answers with examples and explanations</li>
                  <li>Express and justify opinions</li>
                  <li>
                    Use advanced vocabulary and complex sentence structures
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-blue-500" />
                Effective Practice Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Regular Practice</h4>
                  <p className="text-sm">
                    Practice speaking for at least 15-20 minutes daily on
                    various topics.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Record Yourself</h4>
                  <p className="text-sm">
                    Record your responses and listen to identify areas for
                    improvement.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">
                    Expand Vocabulary
                  </h4>
                  <p className="text-sm">
                    Learn topic-specific vocabulary and practice using it in
                    context.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Get Feedback</h4>
                  <p className="text-sm">
                    Seek feedback from teachers or language exchange partners.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Button size="lg" asChild>
          <Link href={routes.pages.learning.speaking.new.value}>
            Start New Practice Session <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
