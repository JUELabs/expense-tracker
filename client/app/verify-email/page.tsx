"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { API_URL } from "@/lib/api";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [message, setMessage] = useState("Verifying your email...");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [waitingForEmail, setWaitingForEmail] = useState(false);
  const verificationStarted = useRef(false);
  useEffect(() => {
  if (verificationStarted.current) return;

  verificationStarted.current = true;

  const verifyEmail = async () => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const emailParam = params.get("email");

    if (emailParam) {
      setEmail(emailParam);
    }

    if (!token) {
      setMessage(
        "We've sent a verification link to your email. Please check your inbox and click the link to verify your account."
      );

      setWaitingForEmail(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`
      );

      const contentType = response.headers.get("content-type");

      const data = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (!response.ok || data.success === false) {
        setMessage(
          data.message || "Email verification failed."
        );
        setSuccess(false);
        return;
      }

      setMessage(
        data.message || "Email verified successfully!"
      );
      setSuccess(true);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  verifyEmail();
}, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            textAlign: "center",
            border: "1px solid #E2E8F0",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            color={success ? "primary.main" : "text.primary"}
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "1.8rem",
                sm: "2.125rem",
              },
            }}
          >
            {loading
              ? "Verifying Email"
              : waitingForEmail
                ? "Check Your Email"
                : success
                  ? "Email Verified!"
                  : "Verification Failed"}
          </Typography>

          {waitingForEmail && email && (
            <Typography
              sx={{
                mt: 2,
                fontWeight: 700,
                color: "text.primary",
                wordBreak: "break-word",
              }}
            >
              {email}
            </Typography>
          )}

          <Typography color="text.secondary" sx={{ mt: 2 }}>
            {message}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              mt: 4,
              width: "100%",
            }}
          >
            {waitingForEmail && (
              <Button
                variant="outlined"
                onClick={() => router.push("/register")}
                sx={{
                  px: 5,
                  py: 1.2,
                  borderRadius: 2,
                  width: "100%",
                  maxWidth: 320,
                }}
              >
                Use a Different Email
              </Button>
            )}

            {(success || waitingForEmail) && (
              <Button
                variant="contained"
                onClick={() => router.push("/login")}
                sx={{
                  px: 5,
                  py: 1.2,
                  borderRadius: 2,
                  width: "100%",
                  maxWidth: 320,
                }}
              >
                Go to Login
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
