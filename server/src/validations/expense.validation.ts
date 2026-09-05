import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().min(2).max(150),
  amount: z.number().positive(),
  category: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
});

export const updateExpenseSchema = z.object({
  title: z.string().min(2).max(150),
  amount: z.number().positive(),
  category: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
});