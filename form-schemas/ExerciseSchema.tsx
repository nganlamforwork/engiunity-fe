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
