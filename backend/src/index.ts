import express from "express";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import productRoutes from "./routes/products.route.js";
import segmentRoutes from "./routes/segment.route.js";
import dbConnection from "./models/dbConnection/dbConnection.js";
import cors from "cors";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Swagger configuration
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ConvertCart API Documentation",
      version,
      description: "API documentation for ConvertCart application",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://convertcart-adqi.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "number" },
            title: { type: "string" },
            price: { type: "number", format: "float" },
            stock_status: { type: "string", enum: ["instock", "outofstock"] },
            stock_quantity: { type: "number", nullable: true },
            category: { type: "string" },
            tags: { type: "array", items: { type: "string" } },
            on_sale: { type: "boolean" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

// Middleware
app.use(cors({ origin: "*" })); //Allow all origins currently
app.use(express.json());

// API Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Routes
app.use("/products", productRoutes);
app.use("/segments", segmentRoutes);

// Health point
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Start server
const startServer = async () => {
  try {
    await dbConnection();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `API Documentation available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
startServer();
