import mongoose from "mongoose";

const clipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    clipCollection: {
      type: String,
      default: "General",
    },
    type: {
      type: String,
      enum: ["link", "text", "code", "hex"],
      default: "text",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Clip", clipSchema);
