import express from "express";

const router = express.Router();

import {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/orderContoller.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, createOrder)
  .get(protect, isAdmin, getAllOrders);
router.route("/user").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
