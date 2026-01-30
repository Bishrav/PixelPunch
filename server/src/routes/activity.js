import express from "express";
import { Activity } from "../models/Activity.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/log", authMiddleware, async (req, res) => {
    try {
        const { action, details } = req.body;

        await Activity.create({
            userId: req.user.id,
            action,
            details
        });

        res.json({ message: "Activity logged successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error logging activity" });
    }
});

export default router;
