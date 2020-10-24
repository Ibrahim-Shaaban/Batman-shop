import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";

// @desc    get all products
// @route   GET /api/products?keyword=&pageNumber=
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const currentPage = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword;
  const searchOptions = keyword.length
    ? {
        name: { $regex: keyword, $options: "i" },
      }
    : {};
  const productsCount = await Product.countDocuments({ ...searchOptions });
  const products = await Product.find({ ...searchOptions })
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1));
  return res.json({
    products,
    currentPage,
    pages: Math.ceil(productsCount / pageSize),
  });
});

// @desc    get stop rated products
// @route   GET /api/products/top
// @access  Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ rating: -1 }).limit(4);
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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    create review
// @route   POST /api/products/:id/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    //check if user already made review
    const isReviewed = product.reviews.filter(
      (review) => review.user.toString() === req.user._id.toString()
    ).length;

    if (isReviewed) {
      res.status(400);
      throw new Error("Product is already reviewed");
    } else {
      const newReview = {
        rating: Number(rating),
        comment,
        user: req.user._id,
        name: req.user.name,
      };

      product.reviews.push(newReview);
      product.numReviews += 1;
      product.rating =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.numReviews;
    }

    await product.save();
    return res.status(201).json({ message: "review is added successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createReview,
  getTopRatedProducts,
};
