import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/user.js";
dotenv.config();
const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.CLIENT_URL + "/login",
  }),
  async (req, res) => {
    const accessToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: req.user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await User.findByIdAndUpdate(req.user._id, {
      refreshToken: hashedRefreshToken,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ res.redirect ki jagah HTML page bheja
    res.send(`
      <html>
        <body>
          <script>
            window.location.href = "${process.env.CLIENT_URL}/dashboard";
          </script>
        </body>
      </html>
    `);
  },
);
router.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      await User.findByIdAndUpdate(decoded.id, {
        refreshToken: null,
      });
      res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ message: "Logged out successfully" });
    }
  } catch {
    res.status(200).json({ message: "Logged out successfully" });
  }
});
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.post("/refreshToken", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const user = await User.findById(decoded.id);
    if (!user || !user.refreshToken) {
      return res.status(403).json({ message: "Refresh token not found" });
    }
    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
      return res.status(403).json({ message: "Refresh token mismatch" });
    }
    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Access token refreshed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
