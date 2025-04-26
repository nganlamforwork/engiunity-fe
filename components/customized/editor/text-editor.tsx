"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const formatText = (command: string) => {
    document.execCommand(command, false);
    updateHtml();
    editorRef.current?.focus();
  };

  const updateHtml = () => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      onChange(currentHtml); // send html to parent component
    }
  };

  const handleInput = () => {
    updateHtml();
  };

  const isFormatActive = (format: string): boolean => {
    return document.queryCommandState(format);
  };

  return (
    <div className="w-full border rounded-md">
      <div className="flex items-center space-x-1 p-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("bold")}
          className={cn(isFormatActive("bold") && "bg-secondary")}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("italic")}
          className={cn(isFormatActive("italic") && "bg-secondary")}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("underline")}
          className={cn(isFormatActive("underline") && "bg-secondary")}
          aria-label="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => formatText("strikeThrough")}
          className={cn(isFormatActive("strikeThrough") && "bg-secondary")}
          aria-label="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input focus:rounded-b-md"
        onInput={handleInput}
        suppressContentEditableWarning
      />
    </div>
  );
}
