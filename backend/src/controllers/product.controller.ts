import Product from "../models/products.js";
import type { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ error: "No products found" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Fetching products failed" });
  }
};

export default getProducts;
