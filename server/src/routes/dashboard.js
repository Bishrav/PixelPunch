import express from 'express';
import { Car } from '../models/Car.js';
import { Activity } from '../models/Activity.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/dashboard/stats - Get user stats and activity
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Stats
        const carsListed = await Car.count({ where: { ownerId: userId, status: 'Available' } });
        const carsSold = await Car.count({ where: { ownerId: userId, status: 'Sold' } });
        const carsBought = 0; // Placeholder until transaction logic

        // Calculate Revenue (Sum of price of sold cars)
        const soldCars = await Car.findAll({ where: { ownerId: userId, status: 'Sold' }, attributes: ['price'] });
        const revenue = soldCars.reduce((sum, car) => sum + car.price, 0);

        // Recent Activity
        const recentActivity = await Activity.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: 5
        });

        // My Listings (All cars owned by user)
        const myListings = await Car.findAll({
            where: { ownerId: userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            stats: {
                carsListed,
                carsSold,
                carsBought,
                revenue
            },
            recentActivity,
            myListings
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;