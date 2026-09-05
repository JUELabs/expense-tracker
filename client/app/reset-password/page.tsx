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

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (!newPassword) {
      setError("New password is required.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        setError(data.message || "Failed to reset password");
        return;
      }

      setMessage(data.message || "Password reset successfully");
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
              Reset Password
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
              Create a new password for your account.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleResetPassword}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <TextField
              fullWidth
              type="password"
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError("");
                setMessage("");
              }}
              error={Boolean(error)}
              required
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
                setMessage("");
              }}
              error={Boolean(error)}
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
              {loading ? "Resetting..." : "Reset Password"}
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

          {error && (
            <Typography
              color="error"
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
              {error}
            </Typography>
          )}

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
