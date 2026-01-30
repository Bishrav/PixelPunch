import express from "express";
import { User } from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET current user profile
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ["password"] }
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT update profile
router.put("/", authMiddleware, async (req, res) => {
    try {
        const { bio, title, profileImage, username } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        user.bio = bio || user.bio;
        user.title = title || user.title;
        user.profileImage = profileImage || user.profileImage;
        if (username) user.username = username;

        await user.save();

        // Return updated user without password
        const updatedUser = user.toJSON();
        delete updatedUser.password;

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
