import express from "express";
// 👇 1. Import the new functions
import {
  Signup,
  Login,
  userStatus,
  Logout,
  ForgotPassword,
  ResetPassword,
} from "../Controllers/AuthController.js";
import { userVerification } from "../Middlewares/AuthMiddleWare.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification, userStatus);
router.post("/logout", Logout);

// 👇 2. Add the new routes
router.post("/forgot-password", ForgotPassword);
router.post("/reset-password", ResetPassword);

export default router;