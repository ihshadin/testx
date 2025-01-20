import { z } from "zod";
import { QUESTION_STATUS } from "./question.constant";

export const createQuestionValidationSchema = z.object({
  question_id: z.number().optional(),
  title: z.string().min(1, "Question Title is required").trim(),
  desc: z.string().min(1, "Description is required"),
  newDesc: z.string().optional(),
  domain: z.string().trim().optional(),
  difficulty_level: z.enum(["easy", "medium", "hard"]),
  courses: z
    .array(z.string().min(1, "Invalid course ID"))
    .nonempty("Courses are required"), //FK
  subjects: z
    .array(z.string().min(1, "Invalid subject ID"))
    .nonempty("Subjects are required"), //FK
  topics: z
    .array(z.string().min(1, "Invalid topic ID"))
    .nonempty("Topics are required"), //FK
  options: z.array(z.string()).optional(),
  teachers: z.array(z.string()).optional(), //FK
  owner: z.string().optional(), //FK
  status: z
    .enum(Object.values(QUESTION_STATUS) as [string, ...string[]])
    .optional(),
});

export const updateQuestionValidationSchema = z.object({
  title: z.string().min(3, "Title is required").trim().optional(),
  desc: z.string().min(3, "Description is required").trim().optional(),
  newDesc: z.string().optional(),
  status: z
    .enum(Object.values(QUESTION_STATUS) as [string, ...string[]])
    .optional(),
  teachers: z.array(z.string()).optional(),
});
