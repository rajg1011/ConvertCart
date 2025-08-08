import Product from "../models/products.js";
import type { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({ error: "No products found" });
      return;
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Fetching products failed" });
  }
};

export default getProducts;
