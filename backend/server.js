import "./config/passport.js";
import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

dotenv.config();

const app = express();

//connecting db
connectDB();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: false, //cokkies aur sessions allow kiye hai
  }),
);
app.use(express.json());
app.use(passport.initialize());

//routes
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`ur server is live on port ${port}`);
});
