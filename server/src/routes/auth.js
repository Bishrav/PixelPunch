import express from "express";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { Strategy as GitHubStrategy } from "passport-github2";
import session from "express-session";
import dotenv from "dotenv";
import { loginUser, registerUser } from "../controllers/authController.js";
import { User } from "../models/User.js";

dotenv.config();

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
callbackURL : "/auth/google/callback"
},
(accessToken , refreshToken , profile , done) => {
    return done(null , profile);
}
));
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
passport.serializeUser((user ,done) => done(null,user));
passport.deserializeUser((user ,done) => done(null,user));

//Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    
    res.redirect("http://localhost:5173");
  }
);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);
router.post("/register" , registerUser)
router.post("/login", loginUser)

export default router;