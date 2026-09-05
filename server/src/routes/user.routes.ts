import { Router } from "express";
import { authenticate } from "../middlewares/user.middleware";
import { validate } from "../middlewares/validate.middleware";
import { 
  registerUserSchema, 
  loginUserSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema
} from "../validations/user.validation";
import { 
  registerUser, 
  verifyEmail, 
  loginUser, 
  getCurrentUser, 
  logoutUser, 
  forgotPassword, 
  resetPassword,
  changePassword,
  updateProfile
} from "../controllers/user.controller";
const router = Router();

router.post(
  "/register",
  validate(registerUserSchema, "body"),
  registerUser
);
router.get("/verify-email", verifyEmail);
router.post(
  "/login", 
  validate(loginUserSchema, "body"), 
  loginUser
);
router.post("/forgot-password", validate(forgotPasswordSchema, "body"), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema, "body"), resetPassword);
router.get("/me", authenticate, getCurrentUser);
router.put(
  "/profile",
  authenticate,
  validate(updateProfileSchema, "body"),
  updateProfile
);
router.post("/change-password", authenticate, validate(changePasswordSchema, "body"), changePassword);
router.post("/logout", authenticate, logoutUser);


export default router;