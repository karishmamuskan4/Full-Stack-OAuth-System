import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({
    message: "welcome to ur dashboard",
    user: req.user,
  });
});

export default router;
