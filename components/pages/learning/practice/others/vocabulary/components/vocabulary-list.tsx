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
import { VocabularyWord } from "@/types/type";
import { useState } from "react";

export default function VocabularyList({
  words = [],
}: {
  words?: VocabularyWord[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleTranslations, setVisibleTranslations] = useState<
    Record<string, boolean>
  >({});

  // Remove duplicates by word
  const uniqueWords = Array.from(
    new Map((words || []).map((word) => [word.word, word])).values()
  );

  // Filter words based on search term
  const filteredWords = uniqueWords.filter(
    (word) =>
      word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (word.synonyms &&
        word.synonyms.some((syn) =>
          syn.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  const toggleTranslation = (word: string) => {
    setVisibleTranslations((prev) => ({
      ...prev,
      [word]: !prev[word],
    }));
  };

  return (
    <div className="space-y-4">
      {!words || words.length === 0 ? (
        <p className="text-muted-foreground">
          No vocabulary words yet. Complete a vocabulary hunt to add words.
        </p>
      ) : (
        <>
          <div className="mb-4">
            <Input
              placeholder="Search words, types, levels, or synonyms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

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
                  <TableHead className="text-center">
                    Vietnamese Translation
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWords.map((word) => (
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
                          <span className="text-sm text-center text-muted-foreground">
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

          <div className="text-sm text-muted-foreground">
            Showing {filteredWords.length} of {uniqueWords.length} unique words
          </div>
        </>
      )}
    </div>
  );
}
