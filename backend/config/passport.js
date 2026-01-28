import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

console.log("👉 GOOGLE STRATEGY LOADED");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: "google",
          providerId: profile.id,
        });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "google",
            providerId: profile.id,
          });
        }

        console.log("👉 CALLBACK HIT");
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);
