import express from "express";
import evaluateSegment from "../controllers/segment.controller.js";

const router = express.Router();

/**
 * @swagger
 * /segments/evaluate:
 *   post:
 *     summary: Evaluate products based on filter rules
 *     tags: [Segments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userRules
 *             properties:
 *               userRules:
 *                 type: string
 *                 description: Filter rules (one per line)
 *                 example: |
 *                   price > 1000
 *                   category = "Electronics"
 *                   stock_status = "instock"
 *     responses:
 *       200:
 *         description: List of products matching the filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/evaluate", evaluateSegment);

export default router;
