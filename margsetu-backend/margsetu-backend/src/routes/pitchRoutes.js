// src/routes/pitchRoutes.js
import express from "express";
import {
  createPitch,
  getAllPitches,
  getPitchById,
} from "../controllers/pitchController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Submit a new pitch (Authenticated)
router.post("/", protect, createPitch);

// ✅ Get all pitches (for investor dashboard - Public)
router.get("/", getAllPitches);

// ✅ Get pitch by ID (for detailed view page - Public)
router.get("/:id", getPitchById);

export default router;
