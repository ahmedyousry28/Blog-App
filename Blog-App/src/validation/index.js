import * as z from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(30, "First name must be less than 30 characters")
      .regex(/^[A-Za-z]+$/, "First name must contain only letters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(30, "Last name must be less than 30 characters")
      .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Must contain at least 1 lowercase letter"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),
  imageUrl: z
    .string()
    .nonempty("Image URL is required")
    .regex(/^https?:\/\/.+\..+$/, "Invalid URL"),
});
