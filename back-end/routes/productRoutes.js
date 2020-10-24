import express from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  createReview,
  getTopRatedProducts,
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/top").get(getTopRatedProducts);
router.route("/:id/reviews").post(protect, createReview);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProductById)
  .put(protect, isAdmin, updateProduct);

export default router;
