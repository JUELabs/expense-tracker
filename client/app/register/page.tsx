"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { API_URL } from "@/lib/api";

type RegisterForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const newErrors: Errors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          general: data.message || "Registration failed",
        });
        return;
      }

      router.push(
        `/verify-email?email=${encodeURIComponent(formData.email.trim())}`,
      );
    } catch {
      setErrors({
        general: "Something went wrong. Please try again.",
      });
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
        p: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            overflow: "hidden",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              backgroundColor: "#ECFDF5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: { xs: 4, sm: 5 },
              minHeight: { xs: 220, md: 600 },
            }}
          >
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              Expense Tracker
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 300 }}
            >
              Create your account and start
              <br />
              managing your expenses easily.
            </Typography>
          </Box>

          {/* Right Side */}
          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{
              width: { xs: "100%", md: "50%" },
              p: { xs: 3, sm: 5 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.125rem" },
                fontWeight: 700,
              }}
            >
              Create Account
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1, mb: 2 }}>
              Create your account to get started
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName || " "}
              />

              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName || " "}
              />
            </Box>

            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username || " "}
            />

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email || " "}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password || " "}
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword || " "}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.3,
                borderRadius: 2,
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            {errors.general && (
              <Typography
                color="error"
                sx={{
                  textAlign: "center",
                  mt: 2,
                }}
              >
                {errors.general}
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 3,
              }}
            >
              Already have an account?{" "}
              <Typography
                component="a"
                href="/login"
                variant="body2"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Login
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
