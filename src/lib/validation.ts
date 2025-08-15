import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  username: requiredString.regex(/^[a-z0-9_-]+$/, "Only letters, numbers"),
  password: requiredString.min(8, "Password must be at least 8 characters"),
  email: requiredString.email("Invalid email address"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const postSchema = z.object({
  content: requiredString.min(1, "Required"),
});

export type PostValues = z.infer<typeof postSchema>;
