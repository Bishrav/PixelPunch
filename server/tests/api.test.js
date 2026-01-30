import request from 'supertest';
import express from 'express';
// jest.mock needs to be before imports that use it, but ESM hoists imports.
// We'll use jest.unstable_mockModule if we were using top-level await or dynamic imports,
// but standard jest.mock should work with babel-jest or proper settings.

// MOCK SEQUELIZE
jest.mock('../src/db.js', () => ({
    sequelize: {
        authenticate: jest.fn(() => Promise.resolve()),
        sync: jest.fn(() => Promise.resolve()),
        define: jest.fn(() => ({
            findByPk: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            destroy: jest.fn(),
        }))
    }
}));

// MOCK PASSPORT
jest.mock('passport', () => ({
    authenticate: jest.fn(() => (req, res, next) => next()),
    initialize: jest.fn(() => (req, res, next) => next()),
    session: jest.fn(() => (req, res, next) => next()),
    use: jest.fn()
}));

// MOCK MODELS
jest.mock('../src/models/Car.js', () => ({
    Car: {
        findAll: jest.fn(() => Promise.resolve([
            { id: 1, name: "Test Car", status: 'Available', price: 1000 }
        ])),
        create: jest.fn(() => Promise.resolve({ id: 2, name: "New Car" })),
        findByPk: jest.fn((id) => Promise.resolve({ id, name: "Test Car", status: 'Available', ownerId: 1, save: jest.fn() }))
    }
}));

jest.mock('../src/models/Activity.js', () => ({
    Activity: {
        create: jest.fn()
    }
}));

jest.mock('../src/middleware/authMiddleware.js', () => (req, res, next) => {
    req.user = { id: 1, username: 'TestUser' };
    next();
});

// Import Routes AFTER mocks
import carRoutes from '../src/routes/cars.js';

const app = express();
app.use(express.json());
app.use('/api/cars', carRoutes);

describe('Backend Unit Tests', () => {

    test('GET /api/cars should return cars list', async () => {
        const res = await request(app).get('/api/cars');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0].name).toBe('Test Car');
    });

    test('POST /api/cars/buy/:id should succeed', async () => {
        const res = await request(app).post('/api/cars/buy/1')
            .send({ name: 'Buyer', card: '123' }); // Payload ignored by mock but good practice

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Purchase successful');
    });
});
