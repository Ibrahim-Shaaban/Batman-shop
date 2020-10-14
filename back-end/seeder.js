// import mongoose from "mongoose";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // delete old data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // import new data
    const createdUsers = await User.insertMany(users);
    const adminUserId = createdUsers[0]._id;

    const mappedProducts = products.map((product) => {
      return { ...product, user: adminUserId };
    });

    await Product.insertMany(mappedProducts);

    console.log("data is imported successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // delete old data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data is deleted successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
