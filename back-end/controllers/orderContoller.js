import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("there are no items");
  } else {
    const newOrder = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    return res.status(201).json(newOrder);
  }
});

export { createOrder };
