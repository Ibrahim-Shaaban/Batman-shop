import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
const ENVIROMENT = process.env.NODE_ENV;
import connectDB from "./config/db.js";

import productsRouter from "./routes/productRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/products", productsRouter);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `server working in ${ENVIROMENT} mode  at http://localhost:${PORT}`
  );
});
