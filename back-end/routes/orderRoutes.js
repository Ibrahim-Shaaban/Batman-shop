import express from "express";
const router = express.Router();

import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderContoller.js";
import { protect } from "../middlewares/authMiddleware.js";

// private
router.route("/").post(protect, createOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
