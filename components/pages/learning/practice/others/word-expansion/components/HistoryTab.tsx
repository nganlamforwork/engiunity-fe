"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, X } from "lucide-react";
import {
  useDeleteHistoryMutation,
  useGetHistoryQuery,
} from "@/store/api/wordExpansionApi";

import { Button } from "@/components/ui/button";

export function HistoryCard() {
  const { data, isLoading, refetch } = useGetHistoryQuery();

  const [deleteHistoryItem, { isLoading: isDeleting }] =
    useDeleteHistoryMutation();

  const removeHistoryItem = async (word: string) => {
    try {
      await deleteHistoryItem({ word: word }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to delete history item:", error);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full shadow-lg rounded-2xl border-0 bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center py-8 text-gray-500">
            <p>Loading history...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg rounded-2xl border-0 bg-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Searches
          </h3>
        </div>

        {data?.expansions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No search history yet</p>
            <p className="text-sm mt-1">
              Your recent searches will appear here
            </p>
          </div>
        ) : (
          <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {data?.expansions.map((item, index) => (
              <li key={index} className="relative group">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-blue-50 pr-10"
                  asChild
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-blue-700">{index}</span>
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeHistoryItem(index);
                  }}
                  disabled={isDeleting}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
