import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export const userValidationSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  email: z.string().email().min(1, { message: "Email Address is required" }),
  contact_no: z.string().min(1, { message: "Contact Number is required" }),
  role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]).optional(),
  status: z
    .enum(Object.values(USER_STATUS) as [string, ...string[]])
    .optional(),
  course: z.string().min(1, "Invalid course ID").nonempty("Course is required"),
  subject: z.string().min(1, "Invalid ID").nonempty("Subject is required"),
  photo: z.string().optional(),
  coordinator: z.string().optional(),
  teachers: z.array(z.string()).optional(),
});

export const userUpdateValidationSchema = z.object({
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  status: z
    .enum(Object.values(USER_STATUS) as [string, ...string[]])
    .optional(),
  role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]).optional(),
  photo: z.string().optional(),
  coordinator: z.string().optional(),
  teachers: z.array(z.string()).optional(),
});
