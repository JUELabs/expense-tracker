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

import EditIcon from "@mui/icons-material/Edit";

import { API_URL } from "@/lib/api";
import { Expense } from "./GetExpenses";

type UpdateExpenseProps = {
  expense: Expense | null;
  onClose: () => void;
  onExpenseUpdated: (expense: Expense) => void;
};

export default function UpdateExpense({
  expense,
  onClose,
  onExpenseUpdated,
}: UpdateExpenseProps) {
  const [form, setForm] = useState({
    title: expense?.title || "",
    amount: expense?.amount || "",
    category: expense?.category || "",
    description: expense?.description || "",
  });

  const [loading, setLoading] = useState(false);

  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!expense) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/expenses/update-expense/${expense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: form.title.trim(),
            amount: Number(form.amount),
            category: form.category.trim(),
            description: form.description.trim(),
          }),
        },
      );

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        return;
      }

      onExpenseUpdated(data.data);
      onClose();
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={Boolean(expense)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>Edit Expense</DialogTitle>

      {expense && (
        <Box component="form" onSubmit={handleUpdateExpense}>
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
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              required
            />

            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
              required
            />

            <TextField
              fullWidth
              label="Category"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
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
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={onClose} color="inherit" disabled={loading}>
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<EditIcon />}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}
