"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Pause, Play, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { Question } from "@/types/Speaking"

interface PartTwoPromptProps {
  question: Question
  answer: string
  onAnswerChange: (answer: string) => void
  answerMode: "text" | "chat"
}

export function PartTwoPrompt({ question, answer, onAnswerChange, answerMode }: PartTwoPromptProps) {
  const [timerActive, setTimerActive] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [preparationTime, setPreparationTime] = useState(60) // 1 minute preparation time
  const [isPreparing, setIsPreparing] = useState(true)

  const totalSpeakingTime = 120 // 2 minutes speaking time

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + 1

          if (isPreparing && newTime >= preparationTime) {
            setIsPreparing(false)
            return 0 // Reset timer for speaking time
          }

          if (!isPreparing && newTime >= totalSpeakingTime) {
            setTimerActive(false)
          }

          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [timerActive, isPreparing, preparationTime])

  const resetTimer = () => {
    setTimerActive(false)
    setTimeElapsed(0)
    setIsPreparing(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progressPercentage = isPreparing
    ? (timeElapsed / preparationTime) * 100
    : (timeElapsed / totalSpeakingTime) * 100

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-3">{question.text}</p>

          {question.cueCard && (
            <div className="bg-muted p-4 rounded-md mt-3 mb-3">
              <p className="font-medium mb-2">You should say:</p>
              <ul className="space-y-2 list-disc pl-5">
                {question.cueCard.map((cue, index) => (
                  <li key={index}>{cue}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span className="font-medium">
                  {isPreparing ? "Preparation Time:" : "Speaking Time:"} {formatTime(timeElapsed)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setTimerActive(!timerActive)}>
                  {timerActive ? (
                    <>
                      <Pause className="mr-1 h-4 w-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-1 h-4 w-4" /> {timeElapsed === 0 ? "Start" : "Resume"}
                    </>
                  )}
                </Button>

                <Button variant="outline" size="sm" onClick={resetTimer}>
                  <RotateCcw className="mr-1 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>

            <Progress value={progressPercentage} className="h-2" />

            <p className="text-sm text-muted-foreground">
              {isPreparing
                ? "Use this time to make notes and prepare your answer."
                : timeElapsed < 60
                  ? "You should speak for at least 1 minute."
                  : "Try to conclude your answer soon."}
            </p>
          </div>
        </CardContent>
      </Card>

      {answerMode === "text" && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Type your answer below as if you were speaking:</p>
        </div>
      )}
    </div>
  )
}
