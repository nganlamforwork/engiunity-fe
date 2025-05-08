"use client";

import * as z from "zod";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { RootState } from "@/store";
import type { VocabularyWord } from "@/types/type";
import { useForm } from "react-hook-form";
import { useGenerateVocabularyWordsMutation } from "@/store/api/vocabulariesApi";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  count: z.coerce.number().min(10).max(50),
});

export default function VocabularyHunt({
  onComplete,
  words,
  setWords,
  isLoading,
  topic: initialTopic,
  level: initialLevel,
}: {
  words: VocabularyWord[];
  setWords: Dispatch<SetStateAction<VocabularyWord[]>>;
  onComplete: () => void;
  isLoading?: boolean;
  topic?: string;
  level?: string;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState<
    Record<string, boolean>
  >({});

  const [generateVocabularyWords] = useGenerateVocabularyWordsMutation();
  const session = useSelector(
    (state: RootState) => state.session.currentSession
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: initialTopic || "",
      level: (initialLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2") || "B1",
      count: words.length || 10,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.id) {
      toast({
        title: "Error",
        description: "Session not initialized. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const wordList = await generateVocabularyWords({
        topic: values.topic,
        level: values.level,
        wordCount: values.count,
        sessionId: session.id,
      }).unwrap();
      setWords(wordList.data);
    } catch (error) {
      console.error("Error generating vocabulary:", error);
      toast({
        title: "Error",
        description: "Failed to generate vocabulary words. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const toggleTranslation = (word: string) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [word]: !prev[word],
    }));
  };

  useEffect(() => {
    if (initialTopic) {
      form.setValue("topic", initialTopic);
    }

    if (
      initialLevel &&
      ["A1", "A2", "B1", "B2", "C1", "C2"].includes(initialLevel)
    ) {
      form.setValue(
        "level",
        initialLevel as "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
      );
    }

    if (words.length > 0) {
      form.setValue("count", words.length);
    }
  }, [initialTopic, initialLevel, words.length, form]);

  const isFormDisabled =
    Boolean(words.length) || Boolean(isLoading) || Boolean(session?.readOnly);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Step 1: Vocabulary Hunt</h2>
        <p className="text-muted-foreground mb-6">
          Select a topic, CEFR level, and number of words to study.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Environment, Education"
                      disabled={isFormDisabled}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a topic you want to learn vocabulary for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEFR Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isFormDisabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A1">A1 (Beginner)</SelectItem>
                      <SelectItem value="A2">A2 (Elementary)</SelectItem>
                      <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                      <SelectItem value="B2">
                        B2 (Upper Intermediate)
                      </SelectItem>
                      <SelectItem value="C1">C1 (Advanced)</SelectItem>
                      <SelectItem value="C2">C2 (Proficiency)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your current language level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Words</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={10}
                      max={50}
                      disabled={isFormDisabled}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Choose between 10-50 words</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!session?.readOnly && (
            <Button
              type="submit"
              disabled={loading || !session?.id || isFormDisabled}
            >
              {(loading || isLoading) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Vocabulary List
            </Button>
          )}
        </form>
      </Form>

      {words.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Word</TableHead>
                  <TableHead>IPA</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Synonyms</TableHead>
                  <TableHead>Example</TableHead>
                  <TableHead>Vietnamese Translation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {words.map((word) => (
                  <TableRow key={word.word}>
                    <TableCell className="font-medium">{word.word}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {word.ipa || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{word.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{word.level}</Badge>
                    </TableCell>
                    <TableCell>{word.synonyms?.join(", ") || "—"}</TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{ __html: word.example || "—" }}
                    />
                    <TableCell>
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleTranslation(word.word)}
                        >
                          {visibleTranslations[word.word] ? "Hide" : "Show"}{" "}
                          Translation
                        </Button>
                        {visibleTranslations[word.word] && (
                          <span className="text-sm text-muted-foreground">
                            {word.vietnameseTranslation ||
                              "Translation not available"}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!session?.readOnly && (
            <Button onClick={onComplete}>
              Save Words & Continue to Step 2
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
