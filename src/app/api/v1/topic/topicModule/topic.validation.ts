import { z } from "zod";

export const createTopicValidationSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  description: z.string().optional(),
  subject: z.string().nonempty("Subjects are required"),
});

export const updateTopicValidationSchema = z.object({
  name: z.string().min(3, "Name is required").trim().optional(),
  description: z.string().optional(),
  subject: z.string().nonempty("Subjects are required").optional(),
});
