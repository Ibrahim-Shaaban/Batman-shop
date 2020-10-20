import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    login user
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });
  if (foundUser && (await foundUser.matchPassword(password))) {
    return res.json({
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
      token: generateToken(foundUser._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private
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

// @desc    add new user
// @route   POST /api/users/register
// @access  Public
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
        token: generateToken(user._id),
        name,
        email,
      });
    }
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    update logged in user profile
// @route   PUT /api/users
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const foundUser = await User.findById(req.user._id);
  if (foundUser) {
    foundUser.name = req.body.name || foundUser.name;
    foundUser.email = req.body.email || foundUser.email;
    foundUser.password = req.body.password || foundUser.password;

    const updatedUser = await foundUser.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
  res.status(401);
  throw new Error("User is not found");
});

// @desc    get users for admin
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (users) {
    return res.json(users);
  }
  res.status(404);
  throw new Error("Thee are no users");
});

// @desc    delete user by admin
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
  const deletedUSer = await User.findByIdAndDelete({ _id: req.params.id });
  if (deletedUSer) return res.json({ message: "user is deleted successfully" });
  res.status(400);
  throw new Error("Can't delete this user");
});

// @desc    get user by admin
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const foundUser = await User.findById({ _id: req.params.id }).select(
    "-password"
  );
  if (foundUser) return res.json(foundUser);
  res.status(404);
  throw new Error("User is not found");
});

// @desc    update user by admin
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  if (foundUser) {
    foundUser.name = req.body.name || foundUser.name;
    foundUser.email = req.body.email || foundUser.email;
    foundUser.isAdmin = req.body.isAdmin || foundUser.isAdmin;

    const updatedUser = await foundUser.save();
    if (updatedUser) {
      return res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.status(404);
  throw new Error("User is not found");
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
