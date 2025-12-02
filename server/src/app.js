import express from "express";
import authRoutes from "./routes/auth.js";
import { sequelize } from "./db.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection error:", err));

sequelize.sync() // creates tables if they don't exist
  .then(() => console.log("Database synced"));

app.listen(5000, () => console.log("Server running on port 5000"));
