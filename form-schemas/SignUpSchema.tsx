import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must not exceed 50 characters" }),
    cfpassword: z.string().min(6, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.cfpassword, {
    message: "Passwords don't match",
    path: ["cfpassword"],
  });
