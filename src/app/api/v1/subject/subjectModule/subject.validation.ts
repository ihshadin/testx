import { z } from "zod";

export const createSubjectValidationSchema = z.object({
  name: z.string().min(3, "Name is required").trim(),
  description: z.string().optional(),
  course: z.string().nonempty("Course are required"),
});

export const updateSubjectValidationSchema = z.object({
  name: z.string().trim().optional(),
  course: z.string().optional(),
  description: z.string().optional(),
});
