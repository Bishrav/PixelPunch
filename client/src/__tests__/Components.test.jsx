import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetails from '../ProductDetails';
import Shop from '../Shop';
import { vi } from 'vitest';

// Mock hooks
vi.mock('../hooks/useAuth', () => ({
    useAuth: () => ({ user: { username: "TestUser" }, isAuthenticated: true })
}));

// Mock axios
vi.mock('axios', () => ({
    default: {
        get: vi.fn((url) => {
            if (url.includes('/cars/')) {
                return Promise.resolve({ data: { id: 1, name: "Super Car", price: 50000, status: 'Available', brand: "Ferrari", type: "Sport" } });
            }
            if (url.includes('/cars')) {
                return Promise.resolve({
                    data: [
                        { id: 1, name: "Super Car", price: 50000, status: 'Available', brand: "Ferrari", type: "Sport" },
                        { id: 2, name: "Hyper Car", price: 1200000, status: 'Available', brand: "Bugatti", type: "Hyper" }
                    ]
                });
            }
            return Promise.resolve({ data: [] });
        }),
        post: vi.fn(() => Promise.resolve({ data: { message: "Success" } }))
    }
}));

// Mock Router params
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({ id: '1' }),
        useNavigate: () => vi.fn(),
    };
});


describe('Shop Component', () => {
    test('renders shop page and cars', async () => {
        render(<BrowserRouter><Shop /></BrowserRouter>);

        // Check for filters
        expect(screen.getByText(/Price Range/i)).toBeInTheDocument();

        // Wait for cars to load (async)
        const carName = await screen.findByText("Super Car");
        expect(carName).toBeInTheDocument();
    });
});

describe('ProductDetails Component', () => {
    test('renders product details and buy button', async () => {
        render(<BrowserRouter><ProductDetails /></BrowserRouter>);

        // Wait for data load
        const title = await screen.findByText("Super Car");
        expect(title).toBeInTheDocument();

        // Check Price
        expect(screen.getByText(/Rs. 50,000/i)).toBeInTheDocument();

        // Check Buy Button
        const buyBtn = screen.getByText("Buy Now");
        expect(buyBtn).toBeInTheDocument();
        expect(buyBtn).not.toBeDisabled();
    });

    test('opens modal on buy click', async () => {
        render(<BrowserRouter><ProductDetails /></BrowserRouter>);

        const buyBtn = await screen.findByText("Buy Now");
        fireEvent.click(buyBtn);

        // Check Modal
        expect(screen.getByText("Secure Checkout")).toBeInTheDocument();

        // Check Placeholder
        expect(screen.getByPlaceholderText("Pixel Punch")).toBeInTheDocument();
    });
});
