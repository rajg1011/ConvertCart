import express from "express";
import evaluateSegment from "../controllers/segment.controller.js";

const router = express.Router();

router.post("/evaluate", evaluateSegment);

export default router;
