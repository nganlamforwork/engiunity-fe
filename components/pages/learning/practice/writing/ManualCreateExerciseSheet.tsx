"use client";

import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

import {
  createExerciseManuallySchema,
  CreateExerciseManuallyValues,
} from "@/form-schemas/ExerciseSchema";
import { toast } from "@/hooks/use-toast";

export function ManuallyCreateExerciseSheet() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<CreateExerciseManuallyValues>({
    resolver: zodResolver(createExerciseManuallySchema),
    defaultValues: {
      part: "",
      exerciseType: "",
      title: "",
      content: "",
    },
  });

  const selectedPart = form.watch("part");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: CreateExerciseManuallyValues) => {
    try {
      const submitData = new FormData();
      submitData.append("part", values.part);
      submitData.append("exerciseType", values.exerciseType || "");
      submitData.append("title", values.title || "");
      submitData.append("content", values.content || "");

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      console.log("Form submitted with data:", Object.fromEntries(submitData));

      form.reset();
      setImageFile(null);
      setOpen(false);
      toast({
        variant: "success",
        title: "Success",
        description: "Exercise created successfully!",
        duration: 1000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Có lỗi xảy ra khi tạo bài tập. Vui lòng thử lại.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "There are something wrong when creating exercise!",
        duration: 1000,
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">Tự thêm bài tập</Button>
      </SheetTrigger>
      <SheetContent className="xl:w-[700px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Tạo bài tập mới</SheetTitle>
          <SheetDescription>
            Tạo bài tập mới để lưu trữ bài làm và sử dụng tính năng chấm điểm
            bằng AI. Bạn có thể nhập bất kỳ đề bài nào bạn tìm thấy vào ô bên
            dưới nhé!
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="part"
              required
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">Part</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phần" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part1">Part 1</SelectItem>
                        <SelectItem value="part2">Part 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedPart === "part1" && (
              <FormField
                control={form.control}
                name="exerciseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Chọn dạng bài
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn dạng bài" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="type1">Dạng 1</SelectItem>
                          <SelectItem value="type2">Dạng 2</SelectItem>
                          <SelectItem value="type3">Dạng 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="title"
              required
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Gia đình" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              required
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">Mô tả</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Eg: The most important aim of science should be to improve people's lives...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <Label htmlFor="image">Ảnh mô tả</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  className="cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <SheetFooter className="pt-2">
              <Button type="submit">Tạo bài tập</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
