import { BrevoClient } from "@getbrevo/brevo";
import { env } from "../config/env";

const brevo = new BrevoClient({
  apiKey: env.BREVO_API_KEY as string,
});

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
): Promise<void> => {
  const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Expenses App",
      email: env.EMAIL_FROM as string,
    },
    to: [
      {
        email,
      },
    ],
    subject: "Verify your email",
    htmlContent: `
    <h2>Verify your email</h2>
    <p>Click the button below to verify your email address.</p>
    <a href="${verificationUrl}">Verify Email</a>
  `,
  });
};
export const sendResetPasswordEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      name: "Expenses App",
      email: env.EMAIL_FROM as string,
    },
    to: [
      {
        email,
      },
    ],
    subject: "Reset your password",
    htmlContent: `
      <h2>Reset your password</h2>

      <p>We received a request to reset your password.</p>

      <p>Click the button below to reset your password:</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>
    `,
  });
};
