import express from "express";
import {
  authUser,
  deleteUserById,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  updateUserById,
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
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUserById)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserById);

export default router;
