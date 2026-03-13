import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

console.log("GOOGLE STRATEGY LOADED");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Step 1 providerId se dhundo (normal case)
        let user = await User.findOne({
          provider: "google",
          providerId: profile.id,
        });

        // Step 2 email se dhundna
        if (!user) {
          user = await User.findOne({
            email: profile.emails[0].value,
          });

          // mila toh providerId update kardo
          if (user) {
            user.providerId = profile.id;
            user.provider = "google";
            await user.save();
          }
        }

        // Step 3 — bilkul naya user banao (pehli baar login)
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
            providerId: profile.id,
          });
        }

        console.log("👉 CALLBACK HIT:", user.email);
        return done(null, user);
      } catch (error) {
        console.error("Passport error:", error.message);
        return done(error, null);
      }
    },
  ),
);
