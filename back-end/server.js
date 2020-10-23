import path from "path";
import morgan from "morgan";
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

import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

connectDB();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/products", productsRouter);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `server working in ${ENVIROMENT} mode  at http://localhost:${PORT}`
  );
});
