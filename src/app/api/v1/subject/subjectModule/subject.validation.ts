import { z } from "zod";

export const createSubjectValidationSchema = z.object({
  name: z.string().min(3, "Name is required").trim(),
  courses: z
    .array(z.string().min(1, "Invalid course ID"))
    .nonempty("Courses are required"),
  description: z.string().optional(),
});

export const updateSubjectValidationSchema = z.object({
  name: z.string().min(3, "Name is required").trim().optional(),
  courses: z
    .array(z.string().min(1, "Invalid course ID"))
    .nonempty("Courses cannot be empty")
    .optional(),
  description: z.string().optional(),
});
