import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

// @desc    get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.json(products);
});

// @desc    get specific product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  res.status(404);
  throw Error("can't find product");
});

// @desc    delete specific product by id from admin
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) return res.json({ message: "product is deleted" });
  res.status(404);
  throw Error("can't find product");
});

export { getProducts, getProductById, deleteProductById };
