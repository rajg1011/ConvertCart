import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/products.route.js";
import segmentRoutes from "./routes/segment.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/products", productRoutes);
app.use("/segments", segmentRoutes);

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error in Connection:", err));
