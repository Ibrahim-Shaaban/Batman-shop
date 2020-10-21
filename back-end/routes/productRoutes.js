import express from "express";
import {
  deleteProductById,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProductById);

export default router;
