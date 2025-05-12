"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/utils/routes";
import HeaderSkill from "../../../HeaderSkill";
import { TopicSelector } from "@/components/customized/topic-selector";
import { topics } from "@/constants/topics";
import { ESpeakingPart } from "@/types/Speaking";
import { useCreateSpeakingSessionMutation } from "@/store/api/speakingSessionApi";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  notes: z.string().optional(),
  part: z.enum([
    ESpeakingPart.FULL,
    ESpeakingPart.PART_1,
    ESpeakingPart.PART_2,
    ESpeakingPart.PART_3,
  ]),
});

export default function New() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aspects, setAspects] = useState<string[]>([]);
  const [showAspects, setShowAspects] = useState(false);
  const router = useRouter();
  const [createSpeakingSession] = useCreateSpeakingSessionMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      notes: "",
      part: ESpeakingPart.FULL,
    },
  });

  const selectedTopic = form.watch("topic");

  useEffect(() => {
    if (selectedTopic) {
      const topicData = topics.find((t) => t.topic === selectedTopic);
      if (topicData) {
        setAspects(topicData.aspects);
        setShowAspects(false);
        setTimeout(() => setShowAspects(true), 50);
      } else {
        setAspects([]);
      }
    } else {
      setAspects([]);
    }
  }, [selectedTopic]);

  const handleAspectClick = (aspect: string) => {
    form.setValue("notes", aspect);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    try {
      const response = await createSpeakingSession(values).unwrap();
      const sessionId = response.id;
      const firstQuestion = response.questions?.[0];

      if (!firstQuestion) {
        throw new Error("Không có câu hỏi nào được tạo.");
      }

      const part = firstQuestion.part;
      console.log(firstQuestion);

      if (part === ESpeakingPart.PART_1) {
        router.push(`/learning/speaking/session/${sessionId}/part-1`);
      } else if (part === ESpeakingPart.PART_2) {
        router.push(`/learning/speaking/session/${sessionId}/part-2`);
      } else {
        router.push(`/learning/speaking/session/${sessionId}/part-3`);
      }
    } catch (error) {
      console.error("Failed to create speaking session:", error);
    } finally {
      setIsGenerating(false);
    }
  };
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
                router.push(routes.pages.learning.speaking.value);
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
                name="notes"
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
                    {aspects.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {aspects.map((aspect, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent transition-colors"
                            onClick={() => handleAspectClick(aspect)}
                          >
                            {aspect}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="part"
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
                          <RadioGroupItem
                            value={ESpeakingPart.FULL}
                            id="full"
                          />
                          <Label htmlFor="full">Đầy đủ (Part 1, 2, 3)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={ESpeakingPart.PART_1}
                            id="part1"
                          />
                          <Label htmlFor="part1">Part 1: Giới thiệu</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={ESpeakingPart.PART_2}
                            id="part2"
                          />
                          <Label htmlFor="part2">Part 2: Nói dài</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={ESpeakingPart.PART_3}
                            id="part3"
                          />
                          <Label htmlFor="part3">Part 3: Thảo luận</Label>
                        </div>
                      </RadioGroup>
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
