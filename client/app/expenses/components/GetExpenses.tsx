"use client";

import { useEffect , useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { API_URL } from "@/lib/api";
import {
  deleteExpense,
  deleteAllExpenses,
} from "./DeleteExpense";

export type Expense = {
  id: string;
  title: string;
  amount: string;
  category: string;
  description?: string;
};

type GetExpensesProps = {
  expenses: Expense[];
  setExpenses: React.Dispatch<
    React.SetStateAction<Expense[]>
  >;
  onAdd: () => void;
  onEdit: (expense: Expense) => void;
};

export default function GetExpenses({
  expenses,
  setExpenses,
  onAdd,
  onEdit,
}: GetExpensesProps) {
  const [deleteExpenseId, setDeleteExpenseId] = useState<string | null>(null);
  const [deleteAllOpen, setDeleteAllOpen] = useState(false);
  // Get Expenses
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch(
          `${API_URL}/expenses/get-expenses`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return;
        }

        setExpenses(data.data);
      } catch {}
    };

    getExpenses();
  }, [setExpenses]);

  // Delete Expense
  const handleDeleteExpense = async (
    expenseId: string
  ) => {
    try {
      await deleteExpense(expenseId);

      setExpenses((prev) =>
        prev.filter((item) => item.id !== expenseId)
      );
    } catch {}
  };

  // Delete All Expenses
  const handleDeleteAllExpenses = async () => {
    try {
      await deleteAllExpenses();

      setExpenses([]);
    } catch {}
  };

  return (
    <>
      {/* Expense Count */}
      <Paper
  elevation={0}
  sx={{
    border: "1px solid #E2E8F0",
    borderRadius: 3,
    p: 2.5,
    mb: 3,
    display: "flex",
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
  }}
>
  <Box>
    <Typography
      variant="body2"
      color="text.secondary"
    >
      Total Expenses
    </Typography>

    <Typography
      variant="h5"
      sx={{
        fontWeight: 800,
        mt: 0.5,
      }}
    >
      {expenses.length}
    </Typography>
  </Box>

  <Button
    variant="outlined"
    color="error"
    startIcon={<DeleteIcon />}
    onClick={() => setDeleteAllOpen(true)}
    disabled={expenses.length === 0}
    sx={{
      borderRadius: 2,
      width: { xs: "100%", sm: "auto" },
    }}
  >
    Delete All Expenses
  </Button>
</Paper>

      {/* Expenses List */}
      {expenses.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: 3,
            p: {
              xs: 4,
              sm: 6,
            },
            textAlign: "center",
          }}
        >
          <ReceiptLongIcon
            sx={{
              fontSize: 52,
              color: "text.secondary",
              mb: 1,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            No expenses yet
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.5,
              mb: 2,
            }}
          >
            Start by adding your first expense.
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Add Expense
          </Button>
        </Paper>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {expenses.map((expense) => (
              <Card
                key={expense.id}
                elevation={0}
                sx={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  {/* Title + Amount */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {expense.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mt: 0.5,
                        }}
                      >
                        {expense.category}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${Number(expense.amount).toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Description */}
                  {expense.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mt: 2,
                        lineHeight: 1.6,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {expense.description}
                    </Typography>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => onEdit(expense)}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      fullWidth
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => setDeleteExpenseId(expense.id)}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Dialog
  open={Boolean(deleteExpenseId)}
  onClose={() => setDeleteExpenseId(null)}
  fullWidth
  maxWidth="xs"
>
  <DialogTitle>Delete Expense?</DialogTitle>

  <DialogContent>
    <Typography color="text.secondary">
      Are you sure you want to delete this expense?
      This action cannot be undone.
    </Typography>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button
      onClick={() => setDeleteExpenseId(null)}
    >
      Cancel
    </Button>

    <Button
      color="error"
      variant="contained"
      onClick={async () => {
        if (!deleteExpenseId) return;

        await handleDeleteExpense(deleteExpenseId);
        setDeleteExpenseId(null);
      }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>
<Dialog
  open={deleteAllOpen}
  onClose={() => setDeleteAllOpen(false)}
  fullWidth
  maxWidth="xs"
>
  <DialogTitle>Delete All Expenses?</DialogTitle>

  <DialogContent>
    <Typography color="text.secondary">
      Are you sure you want to delete all your expenses?
      This action cannot be undone.
    </Typography>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button onClick={() => setDeleteAllOpen(false)}>
      Cancel
    </Button>

    <Button
      color="error"
      variant="contained"
      onClick={async () => {
        await handleDeleteAllExpenses();
        setDeleteAllOpen(false);
      }}
    >
      Delete All
    </Button>
  </DialogActions>
</Dialog>
        </>
      )}
    </>
  );
}
