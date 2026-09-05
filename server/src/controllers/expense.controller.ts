import { Request, Response } from "express";
import {
  createExpenseService,
  getExpensesByUserService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
  deleteAllExpensesService,
} from "../services/expense.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";

export const createExpenseController = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, amount, category, description } = req.body;

    const expense = await createExpenseService(
      title,
      amount,
      category,
      description,
      req.user!.id,
    );

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  },
);

export const getExpensesController = asyncHandler(
  async (req: Request, res: Response) => {
    const expenses = await getExpensesByUserService(req.user!.id);

    res.status(200).json({
      success: true,
      message: "Expenses retrieved successfully",
      data: expenses,
    });
  },
);

export const getExpenseByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }

    const expense = await getExpenseByIdService(id, req.user!.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense retrieved successfully",
      data: expense,
    });
  },
);

export const updateExpenseController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }

    const { title, amount, category, description } = req.body;

    const expense = await updateExpenseService(
      id,
      req.user!.id,
      title,
      amount,
      category,
      description,
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  },
);

export const deleteExpenseController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID",
      });
    }

    const expense = await deleteExpenseService(id, req.user!.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  },
);
export const deleteAllExpensesController = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedExpenses = await deleteAllExpensesService(req.user!.id);

    res.status(200).json({
      success: true,
      message: "All expenses deleted successfully",
      deletedCount: deletedExpenses.length,
    });
  },
);
