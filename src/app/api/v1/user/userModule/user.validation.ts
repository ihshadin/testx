import { z } from "zod";

export const userValidationSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email().min(1, { message: "Email Address is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  contact_no: z.string().min(1, { message: "Contact Number is required" }),
  role: z.enum(["admin", "superAdmin", "teacher", "coordinator"]).optional(),
  user_subject: z.string().min(1, { message: "Subject is required" }),
  photo: z.string().optional(),
});

export const userUpdateValidationSchema = z.object({
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  photo: z.string().optional(),
});
