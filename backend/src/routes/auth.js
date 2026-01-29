import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// Routes for Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "SECRET123", { expiresIn: "1d" });

    // Redirect to frontend with token and user info
    const userData = JSON.stringify({ id: user.id, username: user.username, email: user.email });
    res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(userData)}`);
  }
);

// Routes for GitHub Auth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "SECRET123", { expiresIn: "1d" });

    // Redirect to frontend with token and user info
    const userData = JSON.stringify({ id: user.id, username: user.username, email: user.email });
    res.redirect(`http://localhost:5173?token=${token}&user=${encodeURIComponent(userData)}`);
  }
);

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;