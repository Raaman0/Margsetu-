import express from "express";
import { addComment } from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ POST /api/comments/:pitchId → Add comment to pitch
router.post("/:pitchId", protect, addComment);

export default router;
