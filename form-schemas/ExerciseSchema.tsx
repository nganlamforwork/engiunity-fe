import { EWritingExerciseType, EWritingPart } from "@/types/WritingExercise";
import { z } from "zod";

export const createExerciseAISchema = z.object({
  part: z
    .string({ required_error: "Vui lòng chọn phần bài thi." })
    .nonempty("Vui lòng chọn phần bài thi."),
  exerciseType: z
    .string({ required_error: "Vui lòng chọn dạng bài." })
    .optional(),
  topic: z.string().optional(),
  difficulty: z
    .string({ required_error: "Vui lòng chọn độ khó." })
    .nonempty("Vui lòng chọn độ khó."),
});

export type CreateExerciseAIValues = z.infer<typeof createExerciseAISchema>;

export const createExerciseManuallySchema = z.object({
  part: z.nativeEnum(EWritingPart).refine((value) => value !== undefined, {
    message: "Vui lòng chọn phần bài thi.",
  }),
  exerciseType: z
    .nativeEnum(EWritingExerciseType)
    .optional()
    .refine((value) => value !== undefined, {
      message: "Vui lòng chọn dạng bài.",
    }),
  title: z.string().min(10, {
    message: "Tiêu đề phải có ít nhất 10 ký tự",
  }),
  content: z
    .string({
      required_error: "Vui lòng nhập nội dung bài tập",
    })
    .min(10, {
      message: "Nội dung phải có ít nhất 10 ký tự",
    }),
});

export type CreateExerciseManuallyValues = z.infer<
  typeof createExerciseManuallySchema
>;
