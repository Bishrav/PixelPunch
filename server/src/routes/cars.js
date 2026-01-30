import express from 'express';
import { Car } from '../models/Car.js';
import { Activity } from '../models/Activity.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/buy/:id', authMiddleware, async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        if (car.status !== 'Available') {
            return res.status(400).json({ message: 'Car is not available for sale' });
        }

        const previousOwnerId = car.ownerId;


        await car.save();


        await Activity.create({
            userId: previousOwnerId, // Seller
            action: 'Sold',
            details: `Sold ${car.name} to ${req.user.username}`
        });


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


router.get('/', async (req, res) => {
    try {
        const cars = await Car.findAll({ where: { status: 'Available' } });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', authMiddleware, async (req, res) => {
    const { name, brand, price, type, img } = req.body;

    try {
        const newCar = await Car.create({
            name, brand, price, type, img,
            ownerId: req.user.id
        });


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


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });


        if (car.ownerId != req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this car' });
        }

        await car.destroy();


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
