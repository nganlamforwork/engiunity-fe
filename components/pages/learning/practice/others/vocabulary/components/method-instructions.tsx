import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MethodInstructions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="instructions">
        <AccordionTrigger>
          <h4 className="text-xl font-semibold">
            5-Step Vocabulary Learning Method
          </h4>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-2">
            <div>
              <h3 className="font-medium text-lg">Step 1: Vocabulary Hunt</h3>
              <p className="text-muted-foreground">
                Select a topic, CEFR level, and number of words to study. The
                system will generate a list of vocabulary words with their
                types, synonyms, and example sentences.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg">
                Step 2: Paragraph Generation
              </h3>
              <p className="text-muted-foreground">
                Generate a natural paragraph using your selected words. This
                helps you see how the words are used in context.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg">Step 3: Contextual Input</h3>
              <p className="text-muted-foreground">
                Read the paragraph multiple times to memorize the words in
                context. This step reinforces your understanding of how the
                words are used naturally.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg">Step 4: Writing Output</h3>
              <p className="text-muted-foreground">
                Practice using the words by writing your own paragraph. Receive
                feedback and see an improved version of your writing.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg">Step 5: Save and Track</h3>
              <p className="text-muted-foreground">
                Review your learning history, including all your vocabulary
                sessions, writings, and feedback. Track your progress over time.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
