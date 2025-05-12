"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, User2 } from "lucide-react";
import Link from "next/link";

export default function PracticeSpeakingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("exercises");

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
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {/* Banner */}
          <div className="bg-blue-50 p-8 relative overflow-hidden">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold text-blue-600">Kĩ năng nói</h1>
              <p className="text-blue-600/80 mt-2">
                Luyện tập kỹ năng nói theo format bài thi IELTS với các chủ đề
                phổ biến
              </p>
            </div>
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <img
                src="/placeholder.svg?key=3x8kt"
                alt="Speaking practice illustration"
                className="h-32 w-auto"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 py-4">
            <Tabs
              defaultValue="exercises"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList className="grid w-[400px] grid-cols-2">
                  <TabsTrigger value="lessons">Bài học</TabsTrigger>
                  <TabsTrigger value="exercises">Bài tập</TabsTrigger>
                </TabsList>

                <Button
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => router.push("/practice/new")}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Bài tập mới
                </Button>
              </div>

              <TabsContent value="lessons" className="mt-0">
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">
                    Bài học đang được cập nhật
                  </h3>
                  <p className="text-muted-foreground">
                    Vui lòng quay lại sau.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="exercises" className="mt-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">
                      Danh sách các bài tập
                    </h2>
                    <Badge variant="outline" className="text-muted-foreground">
                      Đã làm 2/4 bài
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  {practiceSessions.map((session) => (
                    <Link
                      href={`/practice/session/${session.id}`}
                      key={session.id}
                    >
                      <Card className="hover:border-blue-200 transition-colors cursor-pointer">
                        <CardContent className="p-0">
                          <div className="flex items-stretch">
                            <div className="w-[200px] bg-gray-100 flex items-center justify-center p-4 border-r">
                              {session.type === "Part 1" && (
                                <img
                                  src="/placeholder.svg?key=ufl6q"
                                  alt="Part 1 illustration"
                                  className="h-24 w-auto object-contain"
                                />
                              )}
                              {session.type === "Part 2" && (
                                <img
                                  src="/placeholder.svg?key=mpt5e"
                                  alt="Part 2 illustration"
                                  className="h-24 w-auto object-contain"
                                />
                              )}
                              {session.type === "Part 3" && (
                                <img
                                  src="/group-discussion.png"
                                  alt="Part 3 illustration"
                                  className="h-24 w-auto object-contain"
                                />
                              )}
                            </div>

                            <div className="flex-1 p-5">
                              <div className="flex justify-between">
                                <div className="flex gap-3">
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                                  >
                                    <User2 className="mr-1 h-3 w-3" />
                                    {session.type}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="bg-gray-50 text-gray-700 hover:bg-gray-50"
                                  >
                                    {session.category}
                                  </Badge>
                                </div>
                              </div>

                              <h3 className="text-lg font-medium mt-2">
                                {session.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                {session.description}
                              </p>
                            </div>

                            <div className="w-[120px] border-l flex items-center justify-center">
                              {session.completed ? (
                                <div className="text-center">
                                  <div className="relative inline-flex">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-blue-500 text-blue-500 font-bold text-xl">
                                      {session.score}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm font-medium">
                                    Chưa làm
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
