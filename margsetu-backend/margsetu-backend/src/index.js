// 🌍 Load Environment Variables
import dotenv from "dotenv";
dotenv.config();

// 🔧 Core Modules
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// ✅ Route Imports
import authRoutes from "./routes/authRoutes.js";
import pitchRoutes from "./routes/pitchRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import aiEvalRoutes from "./routes/aiEvalRoutes.js"; // 🧠 AI Evaluation

// 🚀 Initialize App
const app = express();

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());

// 🧾 Request Logger Middleware
app.use((req, res, next) => {
  console.log(`🌐 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// 🔗 Mount API Routes
app.use("/api/auth", authRoutes);         // 🔐 Auth & Users
app.use("/api/pitches", pitchRoutes);     // 🚀 Startup Pitch Routes
app.use("/api/comments", commentRoutes);  // 💬 Comments
app.use("/api/eval", aiEvalRoutes);       // 🧠 AI Evaluation (Pitch Score)
// app.use("/api/ai", aiRoutes);          // 🤖 Future: AI Chatbot

// 📍 Root Route (for sanity check)
app.get("/", (req, res) => {
  res.send("🚀 MargSetu Backend API is Live!");
});

// ❌ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
  });
});

// 🚀 Launch Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n✅ Server running at: http://localhost:${PORT}`);
      console.log("📡 ROUTES:");
      console.log("→ /api/auth       🔐 Auth Routes");
      console.log("→ /api/pitches    🚀 Startup Pitches");
      console.log("→ /api/comments   💬 Comments");
      console.log("→ /api/eval       🧠 AI Evaluation");
      console.log("");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });
