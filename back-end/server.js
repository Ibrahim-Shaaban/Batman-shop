import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const ENVIROMENT = process.env.NODE_ENV;
import products from "./data/products.js";
import connectDB from "./config/db.js";

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  if (product) return res.json(product);
  return res.status(404).json({ error: "can't find product" });
});

app.listen(PORT, () => {
  console.log(
    `server working in ${ENVIROMENT} mode  at http://localhost:${PORT}`
  );
});
