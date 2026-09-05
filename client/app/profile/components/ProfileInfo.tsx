"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { API_URL } from "@/lib/api";

type User = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_verified: boolean;
};

export default function ProfileInfo() {
  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setUser(data.data);

        setForm({
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          username: data.data.username,
          email: data.data.email,
        });
      } catch {
        setError("Something went wrong.");
      }
    };

    getProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");
    if (form.firstName.trim().length < 2) {
      setError("First name must be at least 2 characters");
      return;
    }

    if (form.lastName.trim().length < 2) {
      setError("Last name must be at least 2 characters");
      return;
    }

    if (form.username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          username: form.username.trim(),
          email: form.email.trim(),
        }),
      });

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        setError(data.message || "Failed to update profile");
        return;
      }

      setUser(data.data);

      setForm({
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        username: data.data.username,
        email: data.data.email,
      });

      if (!data.data.is_verified) {
        setMessage(
          "Profile updated. Please check your new email to verify your account.",
        );
      } else {
        setMessage("Profile updated successfully.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E2E8F0",
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography color="text.secondary">
          {error || "Loading profile..."}
        </Typography>
      </Paper>
    );
  }

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
          Profile Information
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Update your personal information.
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

      {!user.is_verified && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Your email is not verified. Please check your email.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
          },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          label="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm({
              ...form,
              firstName: e.target.value,
            })
          }
          required
        />

        <TextField
          fullWidth
          label="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({
              ...form,
              lastName: e.target.value,
            })
          }
          required
        />

        <TextField
          fullWidth
          label="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
          required
        />

        <TextField
          fullWidth
          type="email"
          label="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          required
        />

        <Box
          sx={{
            gridColumn: {
              xs: "auto",
              sm: "1 / -1",
            },
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
