import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error.message === "Email already exists") {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};