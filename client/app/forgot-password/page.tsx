"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { API_URL } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
        }),
      });

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        setError(data.message || "Failed to send reset email");
        return;
      }

      setMessage("Password reset link sent! Please check your email.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: { xs: 2, sm: 3 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: {
              xs: 3,
              sm: 5,
              md: 6,
            },
            border: "1px solid #E2E8F0",
            borderRadius: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 3, sm: 4 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.125rem",
                },
              }}
            >
              Forgot Password?
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1.5,
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                },
                lineHeight: 1.6,
              }}
            >
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleForgotPassword}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <TextField
              fullWidth
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (error) {
                  setError("");
                }

                if (message) {
                  setMessage("");
                }
              }}
              error={Boolean(error)}
              helperText={error || " "}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.3,
                mt: 0.5,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 0.5 }}>
              <Link
                href="/login"
                underline="hover"
                sx={{
                  color: "text.secondary",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                  },
                }}
              >
                Back to Login
              </Link>
            </Box>
          </Box>

          {message && (
            <Typography
              color="success.main"
              sx={{
                mt: 3,
                textAlign: "center",
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.95rem",
                },
                lineHeight: 1.6,
              }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
