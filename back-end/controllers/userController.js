import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });
  if (foundUser && foundUser.matchPassword(password)) {
    return res.json({
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
      token: generateToken(foundUser._id),
    });
  }
  res.status(401);
  throw new Error("invalid email or password");
});

const getUserProfile = asyncHandler(async (req, res) => {
  const foundUser = await User.findById(req.user._id);

  if (foundUser) {
    return res.json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    });
  }
  res.status(401);
  throw new Error("User is not found");
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // check if user is already existed
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    res.status(400);
    throw new Error("User is already existed");
  } else {
    const user = await User.create({ email, password, name });
    if (user) {
      return res.status(201).json({
        isAdmin: user.isAdmin,
        _id: user._id,
        name,
        email,
      });
    }
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { authUser, getUserProfile, registerUser };
