"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Calendar, Filter, Search } from "lucide-react";
import Link from "next/link";
import {
  ESpeakingSessionStatus,
  type SpeakingSession,
  type SpeakingEvaluation,
} from "@/types/Speaking";
import { useGetSpeakingSessionsQuery } from "@/store/api/speakingSessionApi";
import { routes } from "@/utils/routes";

interface SessionWithResults extends SpeakingSession {
  evaluation?: SpeakingEvaluation;
  overallScore?: number;
}

export default function HistoryTab() {
  const router = useRouter();
  const { data: sessionsData, isLoading } = useGetSpeakingSessionsQuery({});
  const [sessions, setSessions] = useState<SessionWithResults[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<
    SessionWithResults[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    if (sessionsData) {
      // Transform the sessions data to include evaluation data
      const sessionsWithResults: SessionWithResults[] = sessionsData.map(
        (session) => ({
          ...session,
          overallScore: undefined, // We'll fetch and set this separately
        })
      );

      setSessions(sessionsWithResults);
      setFilteredSessions(sessionsWithResults);

      // For each session that is scored, fetch the evaluation data
      sessionsData.forEach((session) => {
        if (session.status === ESpeakingSessionStatus.SCORED) {
          // This would ideally be handled with RTK Query's prefetching or parallel queries
          // For simplicity, we're not implementing that here
        }
      });
    }
  }, [sessionsData]);

  useEffect(() => {
    let filtered = [...sessions];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((session) =>
        session.topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply topic filter
    if (topicFilter !== "all") {
      filtered = filtered.filter(
        (session) => session.topic.toLowerCase() === topicFilter.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || "").getTime();
      const dateB = new Date(b.createdAt || "").getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else if (sortOrder === "highest") {
        return (b.overallScore || 0) - (a.overallScore || 0);
      } else {
        return (a.overallScore || 0) - (b.overallScore || 0);
      }
    });

    setFilteredSessions(filtered);
  }, [sessions, searchQuery, topicFilter, sortOrder]);

  // Get unique topics for filter
  const uniqueTopics = Array.from(
    new Set(sessions.map((session) => session.topic))
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeClass = (status: ESpeakingSessionStatus) => {
    switch (status) {
      case ESpeakingSessionStatus.SCORED:
        return "bg-green-100 text-green-800";
      case ESpeakingSessionStatus.SUBMITTED:
        return "bg-blue-100 text-blue-800";
      case ESpeakingSessionStatus.IN_PROGRESS:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Practice History</h1>
        <div className="flex justify-center items-center h-64">
          <p>Loading sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Lịch sử luyện tập</h2>

      <div className="mb-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo chủ đề..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả chủ đề</SelectItem>
                {uniqueTopics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Gần nhất</SelectItem>
                <SelectItem value="oldest">Xa nhất</SelectItem>
                <SelectItem value="highest">Điểm cao nhất</SelectItem>
                <SelectItem value="lowest">Điểm thấp nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredSessions.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">
            Không tìm thấy kì luyện tập nào.
          </h2>
          <p className="text-muted-foreground mb-6">
            {sessions.length === 0
              ? "You haven't completed any practice sessions yet."
              : "No sessions match your current filters."}
          </p>
          <Button asChild>
            <Link href={routes.pages.learning.speaking.new.value}>
              Bắt đầu bài luyện tập mới
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{session.topic}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(session.createdAt)}
                    </CardDescription>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      session.status
                    )}`}
                  >
                    {session.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Part</span>
                    <span className="text-sm">{session.part}</span>
                  </div>

                  {session.notes && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">Ghi chú:</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        {session.notes}
                      </p>
                    </div>
                  )}

                  {session.status === ESpeakingSessionStatus.SCORED &&
                    session.evaluation && (
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Overall Score
                          </span>
                          <span className="text-xl font-bold">
                            {session.evaluation.score.toFixed(1)}
                            <span className="text-sm text-muted-foreground">
                              /9
                            </span>
                          </span>
                        </div>

                        {session.evaluation.scoreDetail && (
                          <div className="space-y-1 mt-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Fluency & Coherence</span>
                              <span>
                                {session.evaluation.scoreDetail.fluency_and_coherence.score.toFixed(
                                  1
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Lexical Resource</span>
                              <span>
                                {session.evaluation.scoreDetail.lexical_resource.score.toFixed(
                                  1
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Grammar</span>
                              <span>
                                {session.evaluation.scoreDetail.grammatical_range_and_accuracy.score.toFixed(
                                  1
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Pronunciation</span>
                              <span>
                                {session.evaluation.scoreDetail.pronunciation.score.toFixed(
                                  1
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </CardContent>
              <CardFooter>
                {session.status === ESpeakingSessionStatus.SCORED ? (
                  <Button asChild className="w-full">
                    <Link
                      href={`/learning/speaking/session/${session.id}/result`}
                    >
                      Xem kết quả <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link href={`/learning/speaking/session/${session.id}`}>
                      {session.status === ESpeakingSessionStatus.SUBMITTED
                        ? "Xem bài làm"
                        : "Tiếp tục làm bài"}{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
