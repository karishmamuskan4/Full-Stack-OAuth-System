import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Generate 6 digit code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST /bot/generate-code
router.post("/generate-code", async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const code = generateCode();

    await User.findByIdAndUpdate(userId, {
      botActivationCode: code,
      botActivationExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    });

    res.json({
      code,
      whatsappNumber: "+14155238886",
      message: `join what-practical\nCLIPIN-${code}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
