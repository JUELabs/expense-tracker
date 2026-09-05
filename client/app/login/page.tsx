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

type Errors = {
  identifier?: string;
  password?: string;
  general?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const newErrors: Errors = {};

    if (!identifier.trim()) {
      newErrors.identifier = "Email or username is required";
    } else if (identifier.trim().length < 3) {
      newErrors.identifier = "Email or username must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
        }),
      });

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok) {
        setErrors({
          general: data.message || "Login failed",
        });
        return;
      }

      router.push("/dashboard");
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
              minHeight: { xs: 220, md: 500 },
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
              Track your expenses easily
              <br />
              and manage your money better.
            </Typography>
          </Box>

          {/* Right Side */}
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              width: { xs: "100%", md: "50%" },
              p: { xs: 3, sm: 5 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.8rem", sm: "2.125rem" },
              }}
            >
              Welcome Back 👋
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Login to your account
            </Typography>

            <TextField
              fullWidth
              label="Email or Username"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);

                if (errors.identifier) {
                  setErrors((prev) => ({
                    ...prev,
                    identifier: undefined,
                  }));
                }
              }}
              margin="normal"
              error={Boolean(errors.identifier)}
              helperText={errors.identifier || " "}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (errors.password) {
                  setErrors((prev) => ({
                    ...prev,
                    password: undefined,
                  }));
                }
              }}
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password || " "}
            />

            <Box sx={{ textAlign: "right", mt: -1 }}>
              <Typography
                component="a"
                href="/forgot-password"
                variant="body2"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.3,
                borderRadius: 2,
              }}
            >
              {loading ? "Logging in..." : "Login"}
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
              Don&apos;t have an account?{" "}
              <Typography
                component="a"
                href="/register"
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
                Register
              </Typography>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
