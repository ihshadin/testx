import { z } from "zod";

export const createQuestionValidationSchema = z.object({
  question_id: z.number(),
  title: z.string().min(3, "Question Title is required").trim(),
  desc: z.string().min(3, "Description is required").trim(),
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
  options: z.array(z.string()),
  teachers: z.array(z.string()).optional(),
  status: z.enum(["assigned", "unassigned", "reassigned"]).optional(),
});

export const updateQuestionValidationSchema = z.object({
  title: z.string().min(3, "Title is required").trim().optional(),
  desc: z.string().min(3, "Description is required").trim().optional(),
  difficulty_level: z.enum(["easy", "medium", "hard"]).optional(),
  status: z.enum(["assigned", "unassigned", "reassigned"]).optional(),
  teachers: z.array(z.string()).optional(),
});
