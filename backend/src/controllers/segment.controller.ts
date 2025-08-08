import type { Request, Response } from "express";
import Product from "../models/products.js";
import parseRules from "../utils/parser-segment.js";
import { ZodError } from "zod";

const evaluateSegment = async (req: Request, res: Response) => {
  try {
    if (!req.body.userRules) {
      res.status(400).json({ message: "No rules provided" });
      return;
    }
    const query = parseRules(req.body.userRules);
    const results = await Product.find(query);
    res.status(200).json({
      message: "Segment evaluation successful",
      results,
    });
  } catch (err) {
    if (err instanceof ZodError || err instanceof Error) {
      res.status(400).json({
        message: "Invalid rules format",
      });
      return;
    }

    res.status(500).json({
      message: "Segment evaluation failed",
    });
  }
};

export default evaluateSegment;
