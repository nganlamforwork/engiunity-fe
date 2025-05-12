"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RootState, useAppSelector } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ContextualInput from "../steps/contextual-input";
import MethodInstructions from "./method-instructions";
import ParagraphGeneration from "../steps/paragraph-generation";
import SessionSummary from "../steps/session-summary";
import VocabularyHunt from "../steps/vocabulary-hunt";
import { VocabularyWord } from "@/types/type";
import WritingOutput from "../steps/writing-output";
import { clearCurrentSession } from "@/store/slice/sessionSlice";
import { useDispatch } from "react-redux";
import { useGetSessionDetailQuery } from "@/store/api/vocabulariesApi";

export default function SessionDetail({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState<string>("1");
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [paragraph, setParagraph] = useState<string>("");
  const [writing, setWriting] = useState("");
  const [feedback, setFeedback] = useState("");
  const [improvedAnswer, setImprovedAnswer] = useState("");

  const session = useAppSelector(
    (state: RootState) => state.session.currentSession
  );

  const { data: sessionDetail, refetch } = useGetSessionDetailQuery(
    { sessionId: session?.id },
    { skip: !session?.id || !session?.readOnly }
  );

  const handleNextStep = () => {
    setActiveStep((step) => String(Number(step) + 1));
  };

  const handleComplete = () => {
    dispatch(clearCurrentSession());
    setActiveTab("history");
  };

  const writingStepData = {
    writing: writing,
    feedback: feedback,
    improvedAnswer: improvedAnswer,
  };

  const updateStateFromSessionDetail = () => {
    if (sessionDetail) {
      if (sessionDetail.vocabularies) {
        setWords(sessionDetail.vocabularies);
      }

      if (sessionDetail.paragraph) {
        setParagraph(
          typeof sessionDetail.paragraph === "string"
            ? sessionDetail.paragraph
            : sessionDetail.paragraph.content || ""
        );
      }

      if (sessionDetail.feedback) {
        setWriting(sessionDetail.writing || "");
        setFeedback(sessionDetail.feedback || "");
        setImprovedAnswer(sessionDetail.improvedAnswer || "");
      }

      setActiveStep("1");
    }
  };

  useEffect(() => {
    if (session?.readOnly && session?.id) {
      refetch();
    }
  }, [session, refetch]);

  useEffect(() => {
    if (sessionDetail) {
      updateStateFromSessionDetail();
    }
  }, [sessionDetail]);

  const isTabDisabled = (tabValue: string) => {
    if (session?.readOnly && sessionDetail) {
      return false;
    }

    return activeStep < tabValue;
  };

  return (
    <div className="space-y-8">
      <MethodInstructions />

      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="1">1. Vocabulary Hunt</TabsTrigger>
          <TabsTrigger value="2" disabled={isTabDisabled("2")}>
            2. Paragraph Generation
          </TabsTrigger>
          <TabsTrigger value="3" disabled={isTabDisabled("3")}>
            3. Contextual Input
          </TabsTrigger>
          <TabsTrigger value="4" disabled={isTabDisabled("4")}>
            4. Writing Output
          </TabsTrigger>
          <TabsTrigger value="5" disabled={isTabDisabled("5")}>
            5. Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="1">
          <Card>
            <CardContent className="pt-6">
              <VocabularyHunt
                level={sessionDetail?.level}
                words={words}
                topic={sessionDetail?.topic}
                setWords={setWords}
                onComplete={handleNextStep}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="2">
          <Card>
            <CardContent className="pt-6">
              <ParagraphGeneration
                words={words}
                paragraph={paragraph}
                setParagraph={setParagraph}
                onComplete={handleNextStep}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="3">
          <Card>
            <CardContent className="pt-6">
              <ContextualInput
                words={words}
                paragraph={paragraph}
                onComplete={handleNextStep}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="4">
          <Card>
            <CardContent className="pt-6">
              <WritingOutput
                words={words}
                writingStepData={writingStepData}
                setWriting={setWriting}
                setImprovedAnswer={setImprovedAnswer}
                setFeedback={setFeedback}
                onComplete={handleNextStep}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="5">
          <Card>
            <CardContent className="pt-6">
              <SessionSummary
                words={words}
                paragraph={paragraph}
                writingStepData={writingStepData}
                level={sessionDetail?.level}
                topic={sessionDetail?.topic}
                onComplete={handleComplete}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
