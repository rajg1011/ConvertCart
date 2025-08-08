import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.route.js";
import segmentRoutes from "./routes/segment.route.js";
import dbConnection from "./models/dbConnection/dbConnection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/products", productRoutes);
app.use("/segments", segmentRoutes);

await dbConnection();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
