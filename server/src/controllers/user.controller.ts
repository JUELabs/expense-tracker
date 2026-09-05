import { Request, Response } from "express";
import {
  createUser,
  verifyUserEmail,
  login,
  getUserById,
  forgotPasswordService,
  resetPasswordService,
  changePasswordService,
  updateProfileService,
} from "../services/user.service";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { env } from "../config/env";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await createUser(
      firstName,
      lastName,
      username,
      email,
      password,
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  },
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response) => {
  const { token } = req.query;
  const result = await verifyUserEmail(token as string);
  res.status(200).json({
    success: true,
    message: "Email verified successfully",
    data: result,
  });
});

export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  const user = await login(identifier, password);
  res.cookie("token", user.token, {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      id: user.user.id,
      first_name: user.user.first_name,
      last_name: user.user.last_name,
      username: user.user.username,
      email: user.user.email,
      is_verified: user.user.is_verified,
    },
  });
});

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getUserById(req.user!.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Current user",
      data: user,
    });
  },
);

export const logoutUser = asyncHandler(
  async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    res.status(200).json({
      success: true,
      message: "Password reset token generated",
      data: result,
    });
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    const result = await resetPasswordService(token, newPassword);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: result,
    });
  },
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    const result = await changePasswordService(
      req.user!.id,
      currentPassword,
      newPassword,
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  },
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, username, email } = req.body;

    const user = await updateProfileService(
      req.user!.id,
      firstName,
      lastName,
      username,
      email,
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  },
);
