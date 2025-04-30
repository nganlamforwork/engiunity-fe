"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TaskSectionProps {
  showTask: boolean
  setShowTask: (show: boolean) => void
}

export default function TaskSection({ showTask, setShowTask }: TaskSectionProps) {
  return (
    <div className="mb-6">
      <Button variant="outline" onClick={() => setShowTask(!showTask)} className="mb-2 flex items-center gap-2">
        {showTask ? (
          <>
            <ChevronUp className="h-4 w-4" /> Hide Task
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4" /> Show Task
          </>
        )}
      </Button>

      {showTask && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Task 1</h3>
              <p>
                The diagram shows the consumption of renewable energy in the USA from 1949-2008. Write a 150-word report
                for a university lecturer identifying the main trends and making comparisons where relevant.
              </p>
              <div className="border rounded-md p-4 bg-slate-50">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Renewable Energy Consumption Graph"
                  className="mx-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
