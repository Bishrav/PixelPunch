import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import session from "express-session";
import dotenv from "dotenv";
import { loginUser, registerUser } from "../controllers/authController.js";
import { User } from "../models/User.js";

dotenv.config();

const router = express.Router();






//Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET || "PixelPunch_Secret_99@", { expiresIn: "1d" });
    const userString = encodeURIComponent(JSON.stringify({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      profileImage: req.user.profileImage
    }));
    // Redirecting to login so useAuth can catch it, but user wants "every page accessible".
    // useAuth checks token on mount. Login page wraps check. 
    // We can redirect to /Dashboard directly IF useAuth is global.
    // useAuth reads from window.location.search in useEffect.
    // If we redirect to /Dashboard?token=..., Dashboard doesn't parse it.
    // Login.jsx (or useAuth hook) parses it. 
    // Best to keep /login as the "Callback Handler" that pivots to Dashboard.
    res.redirect(`http://localhost:5173/login?token=${token}&user=${userString}`);
  }
);
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET || "PixelPunch_Secret_99@", { expiresIn: "1d" });
    const userString = encodeURIComponent(JSON.stringify({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      profileImage: req.user.profileImage
    }));
    res.redirect(`http://localhost:5173/login?token=${token}&user=${userString}`);
  }
);
router.post("/register", registerUser)
router.post("/login", loginUser)

export default router;