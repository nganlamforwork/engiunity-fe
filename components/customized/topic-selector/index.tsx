"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn, FieldValues, FieldPath } from "react-hook-form";
import { topics } from "@/constants/topics";

// Use FieldValues to make the component work with any form type
export function TopicSelector<TFieldValues extends FieldValues = FieldValues>({
  form,
  name = "topic" as FieldPath<TFieldValues>,
}: {
  form: UseFormReturn<TFieldValues>;
  name?: FieldPath<TFieldValues>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-72">
          <FormLabel>Chủ đề</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? topics.find((topic) => topic.topic === field.value)
                        ?.topic || field.value
                    : "Chọn chủ đề..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Tìm kiếm chủ đề..." />
                <CommandList>
                  <CommandEmpty>Không tìm thấy chủ đề.</CommandEmpty>
                  <CommandGroup>
                    {topics.map((topicItem) => (
                      <CommandItem
                        key={topicItem.topic}
                        value={topicItem.topic}
                        onSelect={() => {
                          form.setValue(name, topicItem.topic as any);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            topicItem.topic === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {topicItem.topic}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TopicSelector;
