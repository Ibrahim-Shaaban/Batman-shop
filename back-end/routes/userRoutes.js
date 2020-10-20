import express from "express";
import {
  authUser,
  deleteUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/register").post(registerUser);
router.route("/").get(protect, isAdmin, getUsers);
router.route("/:id").delete(protect, isAdmin, deleteUserById);

export default router;
