import express from 'express';
import { Offer } from '../models/Offer.js';
import { Activity } from '../models/Activity.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const offers = await Offer.findAll({ order: [['createdAt', 'DESC']] });
        res.json(offers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/', authMiddleware, async (req, res) => {
    const { title, type, discount, car, img, expires } = req.body;

    try {
        const newOffer = await Offer.create({
            title, type, discount, car, img, expires,
            ownerId: req.user.id
        });


        await Activity.create({
            userId: req.user.id,
            action: 'Created Offer',
            details: `Created ${title} offer for ${car}`
        });

        res.status(201).json(newOffer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
