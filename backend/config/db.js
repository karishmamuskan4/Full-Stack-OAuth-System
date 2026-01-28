import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("ur databse is connected");
};

export default connectDB;
