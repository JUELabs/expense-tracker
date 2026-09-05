import { API_URL } from "@/lib/api";

export const deleteExpense = async (
  expenseId: string
) => {
  const response = await fetch(
    `${API_URL}/expenses/delete-expense/${expenseId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};

export const deleteAllExpenses = async () => {
  const response = await fetch(
    `${API_URL}/expenses/delete-all-expenses`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.data;
};