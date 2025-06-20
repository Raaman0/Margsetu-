// src/routes/aiEvalRoutes.js
import express from "express";
import { evaluatePitch } from "../controllers/aiEvaluationController.js";

const router = express.Router();

// POST /api/eval/score
router.post("/score", evaluatePitch);

export default router;
