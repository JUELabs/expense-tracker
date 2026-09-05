"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import DashboardLayout from "@/app/components/dashboard/DashboardLayout";
import { API_URL } from "@/lib/api";

type Expense = {
  id: string;
  title: string;
  amount: string;
  category: string;
  description?: string;
  created_at: string;
};

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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
  }, []);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const recentExpenses = [...expenses]
  .sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  )
  .slice(0, 5);

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
        {/* Welcome */}
        <Box sx={{ mb: 4 }}>
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
            Dashboard
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.8,
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
            }}
          >
            Here is an overview of your expenses.
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: 2.5,
            mb: 4,
          }}
        >
          <Card
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Total Expenses
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                }}
              >
                ${totalExpenses.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>

          <Card
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Number of Expenses
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mt: 1,
                  fontWeight: 800,
                }}
              >
                {expenses.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Recent Expenses */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            Recent Expenses
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Your latest recorded expenses
          </Typography>
        </Box>

        {recentExpenses.length === 0 ? (
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
                fontSize: 50,
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
              }}
            >
              Your recent expenses will appear here.
            </Typography>
          </Paper>
        ) : (
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
            {recentExpenses.map((expense) => (
              <Card
                key={expense.id}
                elevation={0}
                sx={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
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
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </DashboardLayout>
  );
}
