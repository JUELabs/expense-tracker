"use client";

import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "@/app/components/dashboard/DashboardLayout";

import AddExpense from "./components/AddExpense";
import GetExpenses, { Expense } from "./components/GetExpenses";

import UpdateExpense from "./components/UpdateExpense";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  return (
    <DashboardLayout>
      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            sm: 4,
            md: 5,
          },
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "1.7rem",
                  sm: "2rem",
                  md: "2.25rem",
                },
              }}
            >
              All Expenses
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 0.8 }}>
              Manage all your expenses in one place.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
            sx={{
              borderRadius: 2,
              px: 2.5,
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Add Expense
          </Button>
        </Box>

        {/* Expenses */}
        <GetExpenses
          expenses={expenses}
          setExpenses={setExpenses}
          onAdd={() => setOpenAddDialog(true)}
          onEdit={(expense) => setEditExpense(expense)}
        />

        {/* Add */}
        <AddExpense
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          onExpenseAdded={(expense) => {
            setExpenses((prev) => [expense, ...prev]);
          }}
        />

        {/* Update */}
        <UpdateExpense
          key={editExpense?.id ?? "empty"}
          expense={editExpense}
          onClose={() => setEditExpense(null)}
          onExpenseUpdated={(updatedExpense) => {
            setExpenses((prev) =>
              prev.map((expense) =>
                expense.id === updatedExpense.id ? updatedExpense : expense,
              ),
            );
            setEditExpense(null);
          }}
        />
      </Container>
    </DashboardLayout>
  );
}
