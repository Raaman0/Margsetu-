import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { pitchId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: "Comment text is required" });
  }

  try {
    const comment = new Comment({
      pitch: pitchId,
      user: req.user._id,
      text,
    });

    await comment.save();

    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error("❌ Comment Error:", error.message);
    res.status(500).json({ success: false, message: "Failed to add comment", error: error.message });
  }
};
