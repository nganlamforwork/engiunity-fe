"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateMockQuestions } from "@/lib/mock-data-speaking";
import { routes } from "@/utils/routes";
import HeaderSkill from "../../../HeaderSkill";
import { TopicSelector } from "@/components/customized/topic-selector";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  additionalNotes: z.string().optional(),
  practiceType: z.enum(["part1", "part2", "part3", "full"]),
});

export default function New() {
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      additionalNotes: "",
      practiceType: "full",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);

    // Simulate API call to generate questions
    setTimeout(() => {
      const sessionId = Date.now().toString();
      const questions = generateMockQuestions(values.topic);

      // In a real app, we would store these in a database or state management
      // For now, we'll use localStorage to simulate persistence
      localStorage.setItem(
        `session_${sessionId}`,
        JSON.stringify({
          id: sessionId,
          topic: values.topic,
          notes: values.additionalNotes,
          practiceType: values.practiceType,
          questions,
          timestamp: new Date().toISOString(),
          currentStep: 1, // Start at step 1 (Part 1)
          currentQuestionIndex: 0,
          answers: {},
        })
      );

      if (values.practiceType === "full" || values.practiceType === "part1") {
        router.push(`/learning/speaking/session/${sessionId}/part-1`);
      } else if (values.practiceType === "part2") {
        router.push(`/learning/speaking/session/${sessionId}/part-2`);
      } else {
        router.push(`/learning/speaking/session/${sessionId}/part-3`);
      }
    }, 1500);
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <HeaderSkill
          title="Tạo bài tập nói mới"
          description="Chọn chủ đề và loại bài tập để bắt đầu luyện tập kỹ năng nói"
          topElements={
            <Button
              variant="ghost"
              onClick={() => {
                return router.push(routes.pages.learning.speaking.value);
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
            </Button>
          }
        />

        <div className="mt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-4xl flex flex-col"
            >
              <TopicSelector form={form} />

              <FormField
                control={form.control}
                name="practiceType"
                required
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Loại bài tập</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="full" id="full" />
                          <Label htmlFor="full">Đầy đủ (Part 1, 2, 3)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="part-1" id="part1" />
                          <Label htmlFor="part1">
                            Part 1: Giới thiệu và câu hỏi chung
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="part2" id="part2" />
                          <Label htmlFor="part2">
                            Part 2: Nói dài (Cue card)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="part3" id="part3" />
                          <Label htmlFor="part3">
                            Part 3: Thảo luận chuyên sâu
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú bổ sung (Tùy chọn)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Các khía cạnh cụ thể của chủ đề này bạn muốn tập trung?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-start">
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang tạo bài tập...
                    </>
                  ) : (
                    <>
                      Tạo bài tập <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
