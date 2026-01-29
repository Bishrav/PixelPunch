import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/User.js";

// Serialize user to session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// --- Google Strategy ---
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: profile.displayName,
          email: email,
          password: "" // No password for OAuth users
        }
      });
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- GitHub Strategy ---
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/github/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails ? profile.emails[0].value : `${profile.username}@github.com`;
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: profile.username || profile.displayName,
          email: email,
          password: ""
        }
      });
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

export default passport;
