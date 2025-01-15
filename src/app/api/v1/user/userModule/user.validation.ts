import { z } from "zod";

export const userValidationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  //   password: z.string().min(1, { message: "Password is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .refine(
      (password) =>
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(password),
      {
        message:
          "Password must contain at least one number and one special character",
      }
    ),
  email: z.string().email().optional(),
  photo: z.string().optional(),
  role: z.enum(["admin", "superAdmin"]).optional(),
});

export const userUpdateValidationSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  photo: z.string().optional(),
});
