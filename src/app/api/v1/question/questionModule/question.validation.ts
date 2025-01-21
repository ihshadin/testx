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
});
