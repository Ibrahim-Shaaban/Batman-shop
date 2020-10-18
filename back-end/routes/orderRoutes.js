import express from "express";
const router = express.Router();

import { createOrder } from "../controllers/orderContoller.js";
import { protect } from "../middlewares/authMiddleware.js";

// private
router.route("/").post(protect, createOrder);

export default router;
