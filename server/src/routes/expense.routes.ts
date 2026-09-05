import { Router } from "express";
import { authenticate } from "../middlewares/user.middleware";
import { validate } from "../middlewares/validate.middleware";
import { 
  createExpenseSchema, 
  updateExpenseSchema
} from "../validations/expense.validation";
import { 
  createExpenseController,
  getExpensesController,
  getExpenseByIdController,
  updateExpenseController,
  deleteExpenseController,
  deleteAllExpensesController
} from "../controllers/expense.controller";

const router = Router();

router.post(
  "/add-expense",
  authenticate,
  validate(createExpenseSchema, "body"),
  createExpenseController
);
router.get(
  "/get-expenses",
  authenticate,
  getExpensesController
);
router.get(
  "/get-expense/:id",
  authenticate,
  getExpenseByIdController
);
router.put(
  "/update-expense/:id",
  authenticate,
  validate(updateExpenseSchema, "body"),
  updateExpenseController
);

router.delete(
  "/delete-expense/:id",
  authenticate,
  deleteExpenseController
);

router.delete(
  "/delete-all-expenses",
  authenticate,
  deleteAllExpensesController
);
export default router;
