import { z } from "zod";

export const createTopicValidationSchema = z.object({
  name: z.string().min(3, "Name is required").trim(),
  subjects: z
    .array(z.string().min(1, "Invalid course ID"))
    .nonempty("Subjects are required"),
  description: z.string().optional(),
});

export const updateTopicValidationSchema = z.object({
  name: z.string().min(3, "Name is required").trim().optional(),
  subjects: z
    .array(z.string().min(1, "Invalid course ID"))
    .nonempty("Subjects cannot be empty")
    .optional(),
  description: z.string().optional(),
});
