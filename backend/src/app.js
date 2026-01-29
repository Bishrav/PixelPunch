import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.js";
import { sequelize } from "./db.js";
import cors from "cors";
import session from "express-session";
import passport from "./config/passportConfig.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { User } from "./models/User.js";

const app = express();

// CORS configuration
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// --- Session setup for passport ---
app.use(session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// --- Passport middleware ---
app.use(passport.initialize());
app.use(passport.session());

// --- Mount auth routes ---
app.use("/api/auth", authRoutes);

// --- Get current user details ---
app.get("/api/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// --- Database connection and sync ---
sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

sequelize.sync()
    .then(() => console.log("Database synced"));

// --- Start server ---
app.listen(5000, () => console.log("Server running on port 5000"));
