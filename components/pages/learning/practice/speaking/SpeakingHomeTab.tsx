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
  Headphones,
  Lightbulb,
  MessageSquare,
  Mic,
} from "lucide-react";
import { routes } from "@/utils/routes";

export function SpeakingHomeTab() {
  return (
    <>
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
