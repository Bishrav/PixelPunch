import passport from "passport";
import { User } from "../models/User.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

// Serialize user to session
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// --- Google Strategy ---
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { email: profile.emails[0].value } });
      if (!user) {
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          password: "", // No password for OAuth users
          profileImage: profile.photos[0]?.value,
          bio: "Joined via Google"
        });
      }
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
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;
      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create({
          username: profile.username || profile.displayName,
          email: email,
          password: "",
          profileImage: profile.photos[0]?.value,
          bio: "Joined via GitHub"
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

export default passport;
