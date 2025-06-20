// src/controllers/pitchController.js
import Pitch from "../models/Pitch.js";

// ✅ [POST] Submit a new pitch (Authenticated)
export const createPitch = async (req, res) => {
  const { title, ideaSummary, industry, fundingNeeded, pitchDeckURL } = req.body;

  if (!title || !ideaSummary || !industry || !fundingNeeded) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be filled: title, ideaSummary, industry, fundingNeeded",
    });
  }

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
    }

    const newPitch = new Pitch({
      title,
      ideaSummary,
      industry,
      fundingNeeded,
      pitchDeckURL,
      createdBy: req.user._id,
    });

    await newPitch.save();

    res.status(201).json({
      success: true,
      message: "Pitch submitted successfully",
      pitch: newPitch,
    });

  } catch (error) {
    console.error("❌ Pitch Submission Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ [GET] Get all pitches (Public route for investor dashboard)
export const getAllPitches = async (req, res) => {
  try {
    const pitches = await Pitch.find().populate("createdBy", "name email");
    res.status(200).json({
      success: true,
      count: pitches.length,
      pitches,
    });
  } catch (error) {
    console.error("❌ Fetch Pitches Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve pitches",
      error: error.message,
    });
  }
};

// ✅ [GET] Get a pitch by ID (for detailed view)
export const getPitchById = async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.id).populate("createdBy", "name email");

    if (!pitch) {
      return res.status(404).json({
        success: false,
        message: "Pitch not found",
      });
    }

    res.status(200).json({
      success: true,
      pitch,
    });

  } catch (error) {
    console.error("❌ Get Pitch By ID Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
