import express from "express";
import User from "../models/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post("/generate-code", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const code = generateCode();

    await User.findByIdAndUpdate(userId, {
      botActivationCode: code,
      botActivationExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.json({
      code,
      whatsappNumber: "+14155238886",
      message: `CLIPIN-${code}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
