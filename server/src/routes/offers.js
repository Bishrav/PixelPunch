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

import { Car } from '../models/Car.js'; // Import Car model

// ... existing code ...

router.post('/claim/:id', authMiddleware, async (req, res) => {
    try {
        const offer = await Offer.findByPk(req.params.id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });

        // Logic to calculate price and create a "Sold" car record for stats
        // Try to find a car with the same name to get base price
        const baseCar = await Car.findOne({ where: { name: offer.car } });
        let price = baseCar ? baseCar.price : 50000; // Default 50k if not found

        // Parse discount
        let discountMultiplier = 1;
        const discountMatch = offer.discount.match(/(\d+)%/);
        if (discountMatch) {
            discountMultiplier = 1 - (parseInt(discountMatch[1]) / 100);
        }

        const finalPrice = Math.floor(price * discountMultiplier);

        // Create a "Sold" car record for this user so Dashboard stats update
        // We use the Offer details to populate this "Phantom" car
        await Car.create({
            name: `${offer.car} (Offer)`,
            brand: 'PixelPunch', // specific brand for offers
            type: offer.type || 'Special',
            price: finalPrice,
            year: new Date().getFullYear(),
            transmission: 'Automatic',
            fuelType: 'Electric',
            status: 'Sold', // vital for "Cars Sold" stat
            img: offer.img,
            description: `Claimed via offer: ${offer.title}`,
            ownerId: req.user.id // Assign to current user so it shows in their dashboard
        });

        // Log Activity
        await Activity.create({
            userId: req.user.id,
            action: 'Claimed Offer',
            details: `Claimed ${offer.title} for ${offer.car}. Saved ${offer.discount}!`
        });

        // Remove the offer
        await offer.destroy();

        res.json({ message: 'Offer claimed successfully' });
    } catch (err) {
        console.error("Claim Error:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
