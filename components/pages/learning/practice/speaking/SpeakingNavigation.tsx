"use client";

import { useRouter, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, PlusCircle, Sparkles } from "lucide-react";
import { routes } from "@/utils/routes";

export function SpeakingTabsNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname === "/learning/speaking") return "home";
    if (pathname === "/learning/speaking/history") return "history";
    return "home"; // Default
  };

  const activeTab = getActiveTab();

  // Handle tab change by navigating to the corresponding route
  const handleTabChange = (value: string) => {
    switch (value) {
      case "home":
        router.push("/learning/speaking");
        break;
      case "history":
        router.push("/learning/speaking/history");
        break;
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-[400px] grid-cols-3">
          <TabsTrigger value="home">Tổng quát</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "home" && (
        <Button size="lg" asChild variant="brandAccent">
          <Link href={routes.pages.learning.speaking.new.value}>
            Start New Practice Session <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
