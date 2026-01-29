import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

export const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

// Handle callback after Google login
export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  session: true, // Enable session
});


export const registerUser = async (req, res) => {
  console.log("body receiverd", req.body);

  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ error: "Passwords do not match" });
  try {
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET || "SECRET123", { expiresIn: "1d" });

    res.status(201).json({ message: "User registered", user: { id: newUser.id, username, email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "SECRET123", { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};
export const redirectToDashboard = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  // You can pass user info to frontend if needed
  res.redirect("http://localhost:5173/Dashboard");
};

// Logout user
export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
};