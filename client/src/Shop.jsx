import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';


import Car1 from "./assets/Collection1.png";

const Shop = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [brandFilter, setBrandFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const originalBackground = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#050505';
        return () => { document.body.style.backgroundColor = originalBackground; };
    }, []);


    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/cars');
                setCars(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching cars:", err);
                setLoading(false);
            }
        };
        fetchCars();
    }, []);


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

    const uniqueBrands = ["All", ...new Set(cars.map(car => car.brand))];

    return (
        <div className="page-container" style={{ backgroundColor: '#111', minHeight: '100vh', color: 'white', fontFamily: '"Orbitron", sans-serif' }}>
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


                <div></div>
            </nav>

            <div className="page-content" style={{ display: 'flex' }}>

                <div style={{
                    width: '300px',
                    padding: '30px',
                    borderRight: '1px solid #222',
                    background: '#0e0e0e',
                    display: 'block'
                }}>
                    <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>Filters</h3>
                    <div style={{ marginBottom: '30px' }}>
                        <h4 style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem' }}>Price Range</h4>
                        {["All", "Low", "Mid", "High"].map(p => (
                            <div key={p} style={{ marginBottom: '5px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.9rem', color: '#ccc' }}>
                                    <input type="radio" name="price" checked={priceFilter === p} onChange={() => setPriceFilter(p)} />
                                    {p === "All" ? "All Prices" : p === "Low" ? "Under $50k" : p === "Mid" ? "$50k - $150k" : "Over $150k"}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>


                <div style={{ flex: 1, padding: '40px', background: '#111' }}>
                    {loading ? (
                        <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading Inventory...</div>
                    ) : (
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
                                    onClick={() => navigate(`/shop/${car.id}`)}
                                >
                                    <div style={{ height: '180px', overflow: 'hidden' }}>
                                        <img src={car.img || Car1} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{car.name}</h4>
                                        <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 10px 0', fontFamily: 'sans-serif' }}>{car.type}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#00ff88', fontWeight: 'bold' }}>Rs. {car.price.toLocaleString()}</span>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!loading && filteredCars.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                            <h2>No cars found matching your criteria.</h2>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
