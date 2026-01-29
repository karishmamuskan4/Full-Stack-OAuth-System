import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const jwtToken = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.redirect(`http://localhost:5173/login?token=${jwtToken}`);
  },
);
export default router;
