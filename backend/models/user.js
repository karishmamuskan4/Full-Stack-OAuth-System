import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { type } from "os";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    provider: {
      type: String,
      required: true, //google
    },
    providerId: {
      type: String,
      required: true, // Google profile ID
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);
export default User;
