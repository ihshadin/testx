import { z } from "zod";
import { QUESTION_STATUS } from "./question.constant";

const ImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
});

export const createQuestionValidationSchema = z.object({
  title: z.string().min(1, "Question Title is required").trim(),
  desc: z.string().min(1, "Description is required"),
  newDesc: z.string().optional(),
  domain: z.string().trim().optional(),
  difficulty_level: z.enum(["easy", "medium", "hard"]),
  courses: z.string().nonempty("Courses are required"), //FK
  subjects: z.string().nonempty("Subjects are required"), //FK
  topics: z.string().nonempty("Topics are required"), //FK
  teachers: z.string().optional(), //FK
  owner: z.string().optional(), //FK
  comment: z.string().trim().optional(),
  images: ImageSchema.optional(),
  status: z.nativeEnum(QUESTION_STATUS).optional(),
});

export const updateQuestionValidationSchema = z.object({
  title: z.string().min(1, "Question Title is required").trim().optional(),
  desc: z.string().min(1, "Description is required").optional(),
  newDesc: z.string().optional(),
  teachers: z.string().optional(), //FK
  owner: z.string().optional(), //FK
  comment: z.string().trim().optional(),
  images: ImageSchema.optional(),
  status: z.nativeEnum(QUESTION_STATUS).optional(),
});
