// src/controllers/aiEvaluationController.js
import axios from "axios";

export const evaluatePitch = async (req, res) => {
  const { pitch } = req.body;

  // 1. Validate input
  if (!pitch || pitch.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Startup pitch is required",
    });
  }

  // 2. Format prompt
  const prompt = `Evaluate this startup pitch and give a score out of 100 with 2-3 lines of constructive feedback:\n\n"${pitch}"`;

  try {
    // 3. Call HuggingFace Inference API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mrm8488/t5-base-finetuned-common_gen", // ✅ Free model
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // ✅ API key in .env
          "Content-Type": "application/json",
        },
      }
    );

    // 4. Get result
    const result = response.data?.[0]?.generated_text || "No evaluation generated.";

    // 5. Send response
    return res.status(200).json({
      success: true,
      evaluation: result,
    });

  } catch (error) {
    console.error("AI Evaluation Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "AI evaluation failed.",
      error: error.response?.data || error.message,
    });
  }
};
