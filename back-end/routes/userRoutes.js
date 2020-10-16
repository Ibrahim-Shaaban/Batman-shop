import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);

// private route
router.route("/profile").get(protect, getUserProfile);

router.route("/register").post(registerUser);

export default router;
