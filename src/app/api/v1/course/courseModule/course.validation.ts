import { z } from "zod";

export const createCourseValidationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().optional(),
});

export const updateCourseValidationSchema = z.object({
  name: z.string().trim().optional(),
  description: z.string().optional(),
});
