import express from "express";
const router = express.Router();

import { createOrder, getOrderById } from "../controllers/orderContoller.js";
import { protect } from "../middlewares/authMiddleware.js";

// private
router.route("/").post(protect, createOrder);
router.route("/:id").get(protect, getOrderById);

export default router;
