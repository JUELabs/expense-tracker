"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { API_URL } from "@/lib/api";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.currentPassword) {
      setError("Current password is required.");
      return;
    }

    if (!form.newPassword) {
      setError("New password is required.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (!form.confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        }),
      });

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        setError(data.message || "Failed to change password.");
        return;
      }

      setMessage("Password changed successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 3,
        p: {
          xs: 2.5,
          sm: 3,
          md: 4,
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Change Password
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Update your account password.
        </Typography>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          type="password"
          label="Current Password"
          value={form.currentPassword}
          onChange={(e) =>
            setForm({
              ...form,
              currentPassword: e.target.value,
            })
          }
          required
        />

        <TextField
          fullWidth
          type="password"
          label="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({
              ...form,
              newPassword: e.target.value,
            })
          }
          required
        />

        <TextField
          fullWidth
          type="password"
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
          required
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "stretch",
              sm: "flex-end",
            },
            mt: 1,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 3,
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
