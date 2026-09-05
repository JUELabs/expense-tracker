import { Request, Response, NextFunction } from "express";
import {ZodSchema} from "zod";

export const validate = (
  schema: ZodSchema,
  type: "body" | "params" | "query"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req[type]);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: result.error.issues,
    });
  }
  next();
  };
};