"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  createExerciseAISchema,
  CreateExerciseAIValues,
} from "@/form-schemas/ExerciseSchema";

export function CreateExerciseAIDialog() {
  const [open, setOpen] = useState(false);

  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<CreateExerciseAIValues>({
    resolver: zodResolver(createExerciseAISchema),
    defaultValues: {
      part: "",
      exerciseType: "",
      topic: "",
      difficulty: "",
    },
  });
  const part = useWatch({
    control: form.control,
    name: "part",
  });
  // Handle form submission
  const handleSubmit = async (values: CreateExerciseAIValues) => {
    try {
      console.log("Form values:", values);
      // await createExerciseWithAI(values);

      // Close the dialog after successful submission
      setOpen(false);

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error creating exercise:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="brandAccent">
          <Sparkles /> Bài tập mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tạo bài tập mới với AI</DialogTitle>
          <DialogDescription>
            Lưu ý: Đây là bài luyện tập do AI tạo, nội dung có thể chưa hoàn hảo
            — hãy dùng để tham khảo và học hỏi!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="part"
              required
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phần</FormLabel>
                  <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value !== "part1") {
                      form.setValue("exerciseType", "");
                    }
                  }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phần trong bài thi IELTS" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="part1">Part 1</SelectItem>
                      <SelectItem value="part2">Part 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {part === "part1" &&<FormField
              control={form.control}
              name="exerciseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dạng bài</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn dạng bài" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="line-chart">Line Chart</SelectItem>
                      <SelectItem value="bar-chart">Bar Chart</SelectItem>
                      <SelectItem value="pie-chart">Pie Chart</SelectItem>
                      <SelectItem value="process">Process</SelectItem>
                      <SelectItem value="map">Map</SelectItem>
                      <SelectItem value="table">Table</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />}

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chủ đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập chủ đề bài tập" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              required
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Độ khó</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn độ khó" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit">Tạo bài tập</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
