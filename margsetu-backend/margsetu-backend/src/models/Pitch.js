import mongoose from "mongoose";

const pitchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ideaSummary: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    fundingNeeded: {
      type: Number,
      required: true,
    },
    pitchDeckURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Pitch = mongoose.model("Pitch", pitchSchema);
export default Pitch;
