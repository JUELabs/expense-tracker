import { pool } from "../config/database";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "./email.service";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { sendResetPasswordEmail } from "./email.service";
export const createUser = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `
      INSERT INTO users (
        first_name,
        last_name, 
        username,
        email, 
        password, 
        verification_token, 
        verification_token_expires_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, first_name, last_name, username, email, created_at
    `,
      [
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
        verificationToken,
        verificationTokenExpiresAt,
      ],
    );
    await sendVerificationEmail(email, verificationToken);
    return result.rows[0];
  } catch (error: any) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }
    throw error;
  }
};

export const verifyUserEmail = async (token: string) => {
  const result = await pool.query(
    "SELECT id, verification_token_expires_at FROM users WHERE verification_token = $1",
    [token],
  );
  
  if (result.rows.length === 0) {
    throw new Error("Invalid verification token");
  }

  const user = result.rows[0];

  const now = new Date();

  if (now > user.verification_token_expires_at) {
    throw new Error("Verification token has expired");
  }

  await pool.query(
    "UPDATE users SET is_verified = true, verification_token = NULL, verification_token_expires_at = NULL WHERE id = $1",
    [user.id],
  );

  return { message: "Email verified successfully" };
};

export const findUserByIdentifier = async (identifier: string) => {
  const result = await pool.query(
    `SELECT
      id,
      first_name,
      last_name,
      username,
      email,
      password,
      is_verified
    FROM users
    WHERE email = $1 OR username = $1`,
    [identifier],
  );

  return result.rows[0];
};

export const login = async (identifier: string, password: string) => {
  const user = await findUserByIdentifier(identifier);

  if (!user) {
    throw new Error("Invalid username/email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username/email or password");
  }

  if (!user.is_verified) {
    throw new Error("Email is not verified");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return {
    user,
    token,
  };
};

export const getUserById = async (id: string) => {
  const result = await pool.query(
    `
    SELECT
      id,
      first_name,
      last_name,
      username,
      email,
      is_verified,
      created_at
    FROM users
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

export const forgotPasswordService = async (email: string) => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const result = await pool.query(
    `
    UPDATE users
    SET
      reset_password_token = $1,
      reset_password_expires_at = $2
    WHERE email = $3
    RETURNING id, email
    `,
    [resetToken, resetTokenExpiresAt, email],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  await sendResetPasswordEmail(result.rows[0].email, resetToken);

  return {
    email: result.rows[0].email,
  };
};

export const resetPasswordService = async (
  token: string,
  newPassword: string,
) => {
  const result = await pool.query(
    `
    SELECT id
    FROM users
    WHERE reset_password_token = $1
      AND reset_password_expires_at > CURRENT_TIMESTAMP
    `,
    [token],
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
    UPDATE users
    SET
      password = $1,
      reset_password_token = NULL,
      reset_password_expires_at = NULL
    WHERE id = $2
    `,
    [hashedPassword, result.rows[0].id],
  );

  return {
    message: "Password reset successfully",
  };
};

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const result = await pool.query(
    `
    SELECT password
    FROM users
    WHERE id = $1
    `,
    [userId],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    currentPassword,
    result.rows[0].password,
  );

  if (!isPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
    UPDATE users
    SET password = $1
    WHERE id = $2
    `,
    [hashedPassword, userId],
  );

  return {
    message: "Password changed successfully",
  };
};

export const updateProfileService = async (
  userId: string,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
) => {
  const currentUser = await pool.query(
    `
    SELECT email
    FROM users
    WHERE id = $1
    `,
    [userId],
  );

  if (currentUser.rows.length === 0) {
    throw new Error("User not found");
  }

  const emailChanged = currentUser.rows[0].email !== email;

  let verificationToken: string | null = null;
  let verificationTokenExpiresAt: Date | null = null;

  if (emailChanged) {
    verificationToken = crypto.randomBytes(32).toString("hex");

    verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }

  const result = await pool.query(
    `
    UPDATE users
    SET
      first_name = $1,
      last_name = $2,
      username = $3,
      email = $4,
      is_verified = CASE
        WHEN $5 = true THEN false
        ELSE is_verified
      END,
      verification_token = $6,
      verification_token_expires_at = $7
    WHERE id = $8
    RETURNING
      id,
      first_name,
      last_name,
      username,
      email,
      is_verified
    `,
    [
      firstName,
      lastName,
      username,
      email,
      emailChanged,
      verificationToken,
      verificationTokenExpiresAt,
      userId,
    ],
  );

  if (emailChanged) {
    await sendVerificationEmail(email, verificationToken!);
  }

  return result.rows[0];
};
