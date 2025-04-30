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
import TextEditor from "@/components/customized/editor/text-editor";
import {
  ECreationSource,
  EWritingExerciseType,
  EWritingPart,
} from "@/types/WritingExercise";
import { useCreateWritingExerciseManuallyMutation } from "@/store/api/writingExercisesApi";

export function ManuallyCreateExerciseSheet() {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<CreateExerciseManuallyValues>({
    resolver: zodResolver(createExerciseManuallySchema),
    defaultValues: {
      part: undefined,
      exerciseType: undefined,
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

  const [
    createWritingExerciseManually,
    { isLoading, isSuccess, isError, error },
  ] = useCreateWritingExerciseManuallyMutation();
  const onSubmit = async (values: CreateExerciseManuallyValues) => {
    try {
      const words = values.content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const description = words.slice(0, 100).join(" ");
      await createWritingExerciseManually({
        data: {
          ...values,
          description,
          creationSource: ECreationSource.USER_CREATED,
        },
        image: imageFile,
      });

      form.reset();
      setImageFile(null);
      setOpen(false);
      toast({
        variant: "success",
        title: "Thành công",
        description: "Thêm bài tập mới thành công!",
        duration: 1000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi xảy ra khi tạo bài tập. Vui lòng thử lại.",
        duration: 1000,
      });
    }
  };

  // if (isSuccess) {
  //   toast({
  //     variant: "success",
  //     title: "Thành công",
  //     description: "Thêm bài tập mới thành công!",
  //     duration: 1000,
  //   });
  // }

  // if (isError && error) {
  //   const errorMessage =
  //     (error as { message?: string })?.message ||
  //     "Có lỗi xảy ra khi tạo bài tập. Vui lòng thử lại.";
  //   toast({
  //     variant: "destructive",
  //     title: "Lỗi",
  //     description: errorMessage,
  //     duration: 1000,
  //   });
  // }
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
                        {Object.values(EWritingPart).map((part) => (
                          <SelectItem key={part} value={part}>
                            {part}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedPart === EWritingPart.PART_1 && (
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
                          {Object.values(EWritingExerciseType).map((part) => (
                            <SelectItem key={part} value={part}>
                              {part}
                            </SelectItem>
                          ))}
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
                    <TextEditor onChange={field.onChange} value={field.value} />
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
