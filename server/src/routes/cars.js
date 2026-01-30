import express from 'express';
import { Car } from '../models/Car.js';
import { Activity } from '../models/Activity.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/cars/:id - Get a single car details
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/cars/buy/:id - Buy a car
router.post('/buy/:id', authMiddleware, async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        if (car.status !== 'Available') {
            return res.status(400).json({ message: 'Car is not available for sale' });
        }

        const previousOwnerId = car.ownerId;

        // Update Car Status
        car.status = 'Sold';
        // Note: In a real app we might transfer ownership or keep a history
        // For now, we keep ownerId as the "Seller" but mark it sold, 
        // OR we could update ownerId to new buyer. 
        // The requirements say "person who posted ... sales number increases". 
        // So we should KEEP ownerId as the seller to track their sales count in dashboard.
        await car.save();

        // Log Sale for Seller
        await Activity.create({
            userId: previousOwnerId, // Seller
            action: 'Sold',
            details: `Sold ${car.name} to ${req.user.username}`
        });

        // Log Purchase for Buyer
        await Activity.create({
            userId: req.user.id, // Buyer
            action: 'Bought',
            details: `Purchased ${car.name}`
        });

        res.json({ message: 'Purchase successful', car });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/cars - Get all available cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.findAll({ where: { status: 'Available' } });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/cars - Add a new car
router.post('/', authMiddleware, async (req, res) => {
    const { name, brand, price, type, img } = req.body;

    try {
        const newCar = await Car.create({
            name, brand, price, type, img,
            ownerId: req.user.id
        });

        // Log Activity
        await Activity.create({
            userId: req.user.id,
            action: 'Added',
            details: `Added ${name} to inventory`
        });

        res.status(201).json(newCar);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/cars/:id - Delete a car (Owner only)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        // Check ownership
        // req.user.id from jwt might be integer or string, robust compare needed
        if (car.ownerId != req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this car' });
        }

        await car.destroy();

        // Log Activity
        await Activity.create({
            userId: req.user.id,
            action: 'Removed',
            details: `Removed ${car.name} from inventory`
        });

        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
