import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar.jsx';
import Footer from './Footer.jsx';

// Reusing existing assets for dummy data
import Car1 from "./assets/Collection1.png";
import Car2 from "./assets/Collection2.png";
import Car3 from "./assets/Collection3.png";
import Car4 from "./assets/Collection4.png";
import Car5 from "./assets/Collection5.png";
import Car6 from "./assets/Collection6.png";
import Car7 from "./assets/Collection7.png";
import Car8 from "./assets/Collection8.png";

const Shop = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [brandFilter, setBrandFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");
    const [isAdding, setIsAdding] = useState(false);

    // Initial Dummy Data (40-50 items)
    const initialCars = [
        { id: 1, name: "Lamborghini Aventador", brand: "Lamborghini", price: 450000, img: Car1, type: "Supercar" },
        { id: 2, name: "Ferrari 488 Spider", brand: "Ferrari", price: 350000, img: Car2, type: "Supercar" },
        { id: 3, name: "Porsche 911 GT3", brand: "Porsche", price: 180000, img: Car3, type: "Sports" },
        { id: 4, name: "Mercedes G63 AMG", brand: "Mercedes", price: 160000, img: Car4, type: "SUV" },
        { id: 5, name: "Toyota Supra MK4", brand: "Toyota", price: 80000, img: Car5, type: "Sports" },
        { id: 6, name: "Honda NSX", brand: "Honda", price: 100000, img: Car6, type: "Supercar" },
        { id: 7, name: "Lamborghini Urus", brand: "Lamborghini", price: 220000, img: Car7, type: "SUV" },
        { id: 8, name: "Ferrari Portofino", brand: "Ferrari", price: 215000, img: Car8, type: "Convertible" },
        { id: 9, name: "Porsche Panamera", brand: "Porsche", price: 90000, img: Car1, type: "Sedan" },
        { id: 10, name: "Mercedes AMG GT", brand: "Mercedes", price: 140000, img: Car2, type: "Sports" },
        { id: 11, name: "Toyota GR86", brand: "Toyota", price: 30000, img: Car3, type: "Sports" },
        { id: 12, name: "Honda Civic Type R", brand: "Honda", price: 45000, img: Car4, type: "Hatchback" },
        { id: 13, name: "Lamborghini Huracan", brand: "Lamborghini", price: 260000, img: Car5, type: "Supercar" },
        { id: 14, name: "Ferrari F8 Tributo", brand: "Ferrari", price: 280000, img: Car6, type: "Supercar" },
        { id: 15, name: "Porsche Cayenne", brand: "Porsche", price: 85000, img: Car7, type: "SUV" },
        { id: 16, name: "Mercedes S-Class", brand: "Mercedes", price: 110000, img: Car8, type: "Sedan" },
        { id: 17, name: "Toyota Land Cruiser", brand: "Toyota", price: 88000, img: Car1, type: "SUV" },
        { id: 18, name: "Honda Accord", brand: "Honda", price: 28000, img: Car2, type: "Sedan" },
        { id: 19, name: "Audi R8", brand: "Audi", price: 170000, img: Car3, type: "Supercar" },
        { id: 20, name: "BMW M4 Competition", brand: "BMW", price: 85000, img: Car4, type: "Coupe" },
        { id: 21, name: "McLaren 720S", brand: "McLaren", price: 310000, img: Car5, type: "Supercar" },
        { id: 22, name: "Aston Martin DB11", brand: "Aston Martin", price: 205000, img: Car6, type: "GT" },
        { id: 23, name: "Bugatti Chiron", brand: "Bugatti", price: 3000000, img: Car7, type: "Hypercar" },
        { id: 24, name: "Koenigsegg Jesko", brand: "Koenigsegg", price: 2800000, img: Car8, type: "Hypercar" },
        { id: 25, name: "Ford Mustang GT", brand: "Ford", price: 55000, img: Car1, type: "Muscle" },
        { id: 26, name: "Chevrolet Corvette", brand: "Chevrolet", price: 70000, img: Car2, type: "Sports" },
        { id: 27, name: "Nissan GT-R", brand: "Nissan", price: 115000, img: Car3, type: "Supercar" },
        { id: 28, name: "Lexus LC 500", brand: "Lexus", price: 95000, img: Car4, type: "Coupe" },
        { id: 29, name: "Jaguar F-Type", brand: "Jaguar", price: 75000, img: Car5, type: "Sports" },
        { id: 30, name: "Maserati MC20", brand: "Maserati", price: 210000, img: Car6, type: "Supercar" },
        { id: 31, name: "Bentley Continental", brand: "Bentley", price: 220000, img: Car7, type: "GT" },
        { id: 32, name: "Rolls Royce Phantom", brand: "Rolls Royce", price: 460000, img: Car8, type: "Luxury" },
        { id: 33, name: "Pagani Huayra", brand: "Pagani", price: 2600000, img: Car1, type: "Hypercar" },
        { id: 34, name: "Lotus Emira", brand: "Lotus", price: 90000, img: Car2, type: "Sports" },
        { id: 35, name: "Alpine A110", brand: "Alpine", price: 70000, img: Car3, type: "Sports" },
        { id: 36, name: "Porsche Taycan", brand: "Porsche", price: 100000, img: Car4, type: "Electric" },
        { id: 37, name: "Tesla Roadster", brand: "Tesla", price: 200000, img: Car5, type: "Electric" },
        { id: 38, name: "Rimac Nevera", brand: "Rimac", price: 2400000, img: Car6, type: "Hypercar" },
        { id: 39, name: "Lucid Air", brand: "Lucid", price: 170000, img: Car7, type: "Electric" },
        { id: 40, name: "Rivian R1T", brand: "Rivian", price: 75000, img: Car8, type: "Truck" }
    ];

    const [cars, setCars] = useState(initialCars);
    const [newCar, setNewCar] = useState({ name: "", brand: "", price: "", type: "", img: null });

    // Handle Add Car
    const handleAddCar = (e) => {
        e.preventDefault();
        const carToAdd = {
            id: cars.length + 1,
            ...newCar,
            price: Number(newCar.price),
            img: newCar.img ? URL.createObjectURL(newCar.img) : Car1 // Use uploaded image or default
        };
        setCars([...cars, carToAdd]);
        setNewCar({ name: "", brand: "", price: "", type: "", img: null });
        setIsAdding(false);
    };

    // Handle Delete Car
    const handleDeleteCar = (id) => {
        setCars(cars.filter(car => car.id !== id));
    };

    // Filter Logic
    const filteredCars = cars.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = brandFilter === "All" || car.brand === brandFilter;

        let matchesPrice = true;
        if (priceFilter === "Low") matchesPrice = car.price < 50000;
        if (priceFilter === "Mid") matchesPrice = car.price >= 50000 && car.price <= 150000;
        if (priceFilter === "High") matchesPrice = car.price > 150000;

        return matchesSearch && matchesBrand && matchesPrice;
    });

    const uniqueBrands = ["All", ...new Set(initialCars.map(car => car.brand))];

    return (
        <div style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white', fontFamily: '"Orbitron", sans-serif' }}>
            <Sidebar />

            <nav style={{
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#0a0a0a',
                borderBottom: '1px solid #222',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h2 onClick={() => navigate("/")} style={{ cursor: 'pointer', margin: 0, letterSpacing: '2px', color: 'white' }}>PIXEL PUNCH SHOP</h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search for your dream car..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '10px 20px',
                            width: '400px',
                            background: '#222',
                            border: '1px solid #333',
                            borderRadius: '25px',
                            color: 'white',
                            outline: 'none',
                            fontFamily: 'sans-serif'
                        }}
                    />
                </div>

                <div>
                    <button
                        onClick={() => setIsAdding(true)}
                        style={{
                            padding: '10px 25px',
                            background: '#00ff88',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textTransform: 'uppercase'
                        }}
                    >
                        Sell Your Car
                    </button>
                </div>
            </nav>

            <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
                {/* FILTER SIDEBAR (Left) */}
                <div style={{
                    width: '300px',
                    padding: '30px',
                    borderRight: '1px solid #222',
                    background: '#0e0e0e',
                    display: 'none', // Hide on small screens, normally block
                    display: 'block'
                }}>
                    <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Filters</h3>

                    <div style={{ marginBottom: '30px' }}>
                        <h4 style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem' }}>Price Range</h4>
                        {["All", "Low", "Mid", "High"].map(p => (
                            <div key={p} style={{ marginBottom: '5px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.9rem', color: '#ccc' }}>
                                    <input
                                        type="radio"
                                        name="price"
                                        checked={priceFilter === p}
                                        onChange={() => setPriceFilter(p)}
                                    />
                                    {p === "All" ? "All Prices" : p === "Low" ? "Under $50k" : p === "Mid" ? "$50k - $150k" : "Over $150k"}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem' }}>Brands</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '400px', overflowY: 'auto' }}>
                            {uniqueBrands.map(b => (
                                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.9rem', color: '#ccc' }}>
                                    <input
                                        type="radio"
                                        name="brand"
                                        checked={brandFilter === b}
                                        onChange={() => setBrandFilter(b)}
                                    />
                                    {b}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MAIN GRID */}
                <div style={{ flex: 1, padding: '40px', background: '#111' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '30px'
                    }}>
                        {filteredCars.map(car => (
                            <div key={car.id} style={{
                                background: '#1a1a1a',
                                border: '1px solid #333',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ height: '180px', overflow: 'hidden' }}>
                                    <img src={car.img} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{car.name}</h4>
                                    <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 10px 0', fontFamily: 'sans-serif' }}>{car.type}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: '#00ff88', fontWeight: 'bold' }}>${car.price.toLocaleString()}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteCar(car.id); }}
                                            style={{ background: 'transparent', border: 'none', color: '#ff4444', fontSize: '1.2rem', cursor: 'pointer' }}
                                            title="Delete listing"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredCars.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                            <h2>No cars found matching your criteria.</h2>
                        </div>
                    )}
                </div>
            </div>

            {/* ADD CAR MODAL */}
            {isAdding && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        background: '#222',
                        padding: '40px',
                        borderRadius: '15px',
                        width: '500px',
                        border: '1px solid #444',
                        boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                    }}>
                        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>List Your Vehicle</h2>
                        <form onSubmit={handleAddCar} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <input
                                required placeholder="Car Name (e.g. Ford Mustang)"
                                value={newCar.name} onChange={e => setNewCar({ ...newCar, name: e.target.value })}
                                style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '5px' }}
                            />
                            <select
                                required
                                value={newCar.brand} onChange={e => setNewCar({ ...newCar, brand: e.target.value })}
                                style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '5px' }}
                            >
                                <option value="">Select Brand</option>
                                {uniqueBrands.filter(b => b !== "All").map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                                <option value="Other">Other</option>
                            </select>
                            <input
                                required type="number" placeholder="Price ($)"
                                value={newCar.price} onChange={e => setNewCar({ ...newCar, price: e.target.value })}
                                style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '5px' }}
                            />
                            <input
                                required placeholder="Type (e.g. SUV, Sports)"
                                value={newCar.type} onChange={e => setNewCar({ ...newCar, type: e.target.value })}
                                style={{ padding: '15px', background: '#333', border: 'none', color: 'white', borderRadius: '5px' }}
                            />

                            {/* Image Upload Input */}
                            <div style={{ background: '#333', padding: '15px', borderRadius: '5px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', color: '#aaa', fontSize: '0.9rem' }}>Upload Car Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setNewCar({ ...newCar, img: e.target.files[0] });
                                        }
                                    }}
                                    style={{ color: 'white' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setIsAdding(false)} style={{ flex: 1, padding: '15px', background: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ flex: 1, padding: '15px', background: '#00ff88', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>List Car</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Shop;
