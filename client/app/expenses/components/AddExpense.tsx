"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { API_URL } from "@/lib/api";
import { Expense } from "./GetExpenses";

type AddExpenseProps = {
  open: boolean;
  onClose: () => void;
  onExpenseAdded: (expense: Expense) => void;
};

export default function AddExpense({
  open,
  onClose,
  onExpenseAdded,
}: AddExpenseProps) {
  const [expenseForm, setExpenseForm] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const handleCreateExpense = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/expenses/add-expense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: expenseForm.title,
            amount: Number(expenseForm.amount),
            category: expenseForm.category,
            description: expenseForm.description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      onExpenseAdded(data.data);

      setExpenseForm({
        title: "",
        amount: "",
        category: "",
        description: "",
      });

      onClose();
    } catch {}
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        Add Expense
      </DialogTitle>

      <Box
        component="form"
        onSubmit={handleCreateExpense}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 1,
          }}
        >
          <TextField
            fullWidth
            label="Title"
            value={expenseForm.title}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                title: e.target.value,
              })
            }
            required
          />

          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={expenseForm.amount}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                amount: e.target.value,
              })
            }
            required
          />

          <TextField
            fullWidth
            label="Category"
            value={expenseForm.category}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                category: e.target.value,
              })
            }
            required
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Description"
            value={expenseForm.description}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                description: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={onClose}
            color="inherit"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Expense
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
