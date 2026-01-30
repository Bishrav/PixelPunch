import express from "express";
import { Project } from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all projects for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await Project.findAll({ where: { userId: req.user.id } });
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// POST Create new project
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, imageUrl, link, techStack } = req.body;
        const newProject = await Project.create({
            title,
            description,
            imageUrl,
            link,
            techStack,
            userId: req.user.id
        });
        res.status(201).json(newProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT Update project
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imageUrl, link, techStack } = req.body;

        const project = await Project.findOne({ where: { id, userId: req.user.id } });
        if (!project) return res.status(404).json({ error: "Project not found" });

        project.description = description || project.description;
        project.title = title || project.title;
        project.imageUrl = imageUrl || project.imageUrl;
        project.link = link || project.link;
        project.techStack = techStack || project.techStack;

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE Project
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Project.destroy({ where: { id, userId: req.user.id } });
        if (!result) return res.status(404).json({ error: "Project not found" });
        res.json({ message: "Project deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
