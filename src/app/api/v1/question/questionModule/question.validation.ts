import { z } from "zod";
import { QUESTION_STATUS } from "./question.constant";

export const createQuestionValidationSchema = z.object({
  title: z.string().min(1, "Question Title is required").trim(),
  desc: z.string().min(1, "Description is required"),
  newDesc: z.string().optional(),
  domain: z.string().trim().optional(),
  difficulty_level: z.enum(["easy", "medium", "hard"]),
  course: z.string().nonempty("Course is required"), //FK
  subject: z.string().nonempty("Subject is required"), //FK
  topic: z.string().nonempty("Topic is required"), //FK
  teacher: z.string().optional(), //FK
  owner: z.string().optional(), //FK
  comment: z.string().trim().optional(),
  images: z.array(z.string().url()).optional(),
  status: z.nativeEnum(QUESTION_STATUS).optional(),
  feedbacks: z
    .array(
      z
        .object({
          f_name: z.string().min(1, "Feedback name is required"),
          f_role: z.string().min(1, "Feedback role is required"),
          f_date: z.string().min(1, "Feedback date is required"),
          f_text: z.string().min(1, "Feedback text is required"),
        })
        .optional()
    )
    .optional(),
  qId: z.number().min(1, "Question ID is required"),
});

export const updateQuestionValidationSchema = z.object({
  title: z.string().trim().optional(),
  desc: z.string().optional(),
  newDesc: z.string().optional(),
  teacher: z.string().optional(), //FK
  owner: z.string().optional(), //FK
  comment: z.string().trim().optional(),
  images: z.array(z.string().url()).optional(),
  status: z.nativeEnum(QUESTION_STATUS).optional(),
  feedbacks: z
    .array(
      z
        .object({
          f_name: z.string().min(1, "Feedback name is required"),
          f_role: z.string().min(1, "Feedback role is required"),
          f_date: z.string().min(1, "Feedback date is required"),
          f_text: z.string().min(1, "Feedback text is required"),
        })
        .optional()
    )
    .optional(),
});
