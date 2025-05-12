import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GradingResult, Session } from "@/types/Speaking";

interface SampleAnswerProps {
  session: Session;
  results: GradingResult;
}

export function SampleAnswer({ session, results }: SampleAnswerProps) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="part1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="part1">Part 1</TabsTrigger>
          <TabsTrigger value="part2">Part 2</TabsTrigger>
          <TabsTrigger value="part3">Part 3</TabsTrigger>
        </TabsList>

        <TabsContent value="part1" className="mt-4 space-y-4">
          {session.questions.part1.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">
                  Question {index + 1}
                </CardTitle>
                <CardDescription>{question.text}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Sample Answer</h4>
                    <p className="text-sm">
                      {results.sampleAnswers[`part1-${index}`]}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Vocabulary</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.keyVocabulary[`part1-${index}`]?.map(
                        (word, idx) => (
                          <span
                            key={idx}
                            className="bg-muted px-2 py-1 rounded-md text-xs"
                          >
                            {word}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="part2" className="mt-4 space-y-4">
          {session.questions.part2.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">Long Turn Topic</CardTitle>
                <CardDescription>{question.text}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Sample Answer</h4>
                    <p className="text-sm">
                      {results.sampleAnswers[`part2-${index}`]}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Structure Analysis
                    </h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li className="text-sm">
                        Introduction: Sets the context clearly
                      </li>
                      <li className="text-sm">
                        Main points: Well-organized and developed
                      </li>
                      <li className="text-sm">
                        Examples: Specific and relevant
                      </li>
                      <li className="text-sm">
                        Conclusion: Summarizes key ideas
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Vocabulary</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.keyVocabulary[`part2-${index}`]?.map(
                        (word, idx) => (
                          <span
                            key={idx}
                            className="bg-muted px-2 py-1 rounded-md text-xs"
                          >
                            {word}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="part3" className="mt-4 space-y-4">
          {session.questions.part3.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">
                  Discussion Question {index + 1}
                </CardTitle>
                <CardDescription>{question.text}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Sample Answer</h4>
                    <p className="text-sm">
                      {results.sampleAnswers[`part3-${index}`]}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Critical Thinking Elements
                    </h4>
                    <ul className="space-y-1 list-disc pl-5">
                      <li className="text-sm">
                        Analysis of different perspectives
                      </li>
                      <li className="text-sm">Evaluation of implications</li>
                      <li className="text-sm">
                        Supporting arguments with evidence
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Vocabulary</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.keyVocabulary[`part3-${index}`]?.map(
                        (word, idx) => (
                          <span
                            key={idx}
                            className="bg-muted px-2 py-1 rounded-md text-xs"
                          >
                            {word}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
