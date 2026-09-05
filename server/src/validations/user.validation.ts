import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(3, "Last name is required"),
  username: z.string().min(3, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});

export const loginUserSchema = z.object({
  identifier: z.string().min(3, "Invalid Login identifier"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
.object({
  token: z.string().min(1),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const changePasswordSchema = z
.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


export const updateProfileSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  username: z.string().min(3).max(100),
  email: z.string().email(),
});