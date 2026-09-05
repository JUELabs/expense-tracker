import { pool } from "../config/database";

export const createExpenseService = async (
  title: string,
  amount: number,
  category: string,
  description: string | undefined,
  userId: string
) => {
  const result = await pool.query(
    `
    INSERT INTO expenses (
      title,
      amount,
      category,
      description,
      user_id
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      title,
      amount,
      category,
      description,
      user_id,
      created_at,
      updated_at
    `,
    [title, amount, category, description, userId]
  );

  return result.rows[0];
};

export const getExpensesByUserService = async (userId: string) => {
  const result = await pool.query(
    `
    SELECT
      id,
      title,
      amount,
      category,
      description,
      user_id,
      created_at,
      updated_at
    FROM expenses
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

export const getExpenseByIdService = async (
  expenseId: string,
  userId: string
) => {
  const result = await pool.query(
    `
    SELECT
      id,
      title,
      amount,
      category,
      description,
      user_id,
      created_at,
      updated_at
    FROM expenses
    WHERE id = $1 AND user_id = $2
    `,
    [expenseId, userId]
  );

  return result.rows[0];
};

export const updateExpenseService = async (
  expenseId: string,
  userId: string,
  title: string,
  amount: number,
  category: string,
  description: string | undefined
) => {
  const result = await pool.query(
    `
    UPDATE expenses
    SET
      title = $1,
      amount = $2,
      category = $3,
      description = $4,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5 AND user_id = $6
    RETURNING
      id,
      title,
      amount,
      category,
      description,
      user_id,
      created_at,
      updated_at
    `,
    [
      title,
      amount,
      category,
      description,
      expenseId,
      userId
    ]
  );

  return result.rows[0];
};

export const deleteExpenseService = async (
  expenseId: string,
  userId: string
) => {
  const result = await pool.query(
    `
    DELETE FROM expenses
    WHERE id = $1 AND user_id = $2
    RETURNING id
    `,
    [expenseId, userId]
  );

  return result.rows[0];
};

export const deleteAllExpensesService = async (userId: string) => {
  const result = await pool.query(
    `
    DELETE FROM expenses
    WHERE user_id = $1
    RETURNING id
    `,
    [userId]
  );

  return result.rows;
};