import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

router.get(
  "",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    return res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    return res.status(404).json({ message: "can't find product" });
  })
);

export default router;
