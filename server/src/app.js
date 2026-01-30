import express from "express";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

import careerRoutes from "./routes/career.js";
import carRoutes from "./routes/cars.js";
import offerRoutes from "./routes/offers.js";
import dashboardRoutes from "./routes/dashboard.js";
import { sequelize } from "./db.js";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import passport from "./config/passportConfig.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());


app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());

// --- Mount auth routes ---
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/career", careerRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --- Optional route to get current user for dashboard ---
app.get("/api/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

// --- Database connection and sync ---
sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error:", err));

sequelize.sync({ alter: true })
    .then(() => console.log("Database synced"));

// --- Start server ---
app.listen(5000, () => console.log("Server running on port 5000"));
