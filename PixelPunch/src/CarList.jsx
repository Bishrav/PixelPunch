import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./PageTemplate.css";

import { useState } from "react";
import Sidebar, { SidebarOffcanvas } from "./Components/Sidebar.jsx";

function CarList() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [cars, setCars] = useState([
        { id: 1, name: "Range Rover", type: "SUV", price: "$95,000" },
        { id: 2, name: "Porsche 911", type: "Sports", price: "$120,000" },
        { id: 3, name: "Lamborghini Aventador", type: "Supercar", price: "$450,000" },
        { id: 4, name: "G-Wagon", type: "SUV", price: "$140,000" },
        { id: 5, name: "Tesla Model S", type: "Electric", price: "$90,000" },
        { id: 6, name: "BMW M5", type: "Sedan", price: "$105,000" },
    ]);

    const [newCar, setNewCar] = useState({ name: "", type: "", price: "" });
    const [isAdding, setIsAdding] = useState(false);

    const handleAddCar = (e) => {
        e.preventDefault();
        const carToAdd = {
            ...newCar,
            id: cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1
        };
        setCars([...cars, carToAdd]);
        setNewCar({ name: "", type: "", price: "" });
        setIsAdding(false);
    };

    const handleDeleteCar = (id) => {
        setCars(cars.filter(car => car.id !== id));
    };

    return (
        <div className="page-container" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
            <Sidebar />
            <nav className="page-nav" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #333' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                        style={{ border: 'none', background: 'transparent' }}
                    >
                        <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                    </button>
                    <button onClick={() => navigate("/")} className="nav-btn" style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '5px 15px', borderRadius: '20px' }}>← Home</button>
                    <SidebarOffcanvas />
                </div>
                {isAuthenticated && (
                    <button onClick={() => navigate("/Dashboard")} className="nav-btn" style={{ background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '5px 15px', borderRadius: '20px' }}>Dashboard</button>
                )}
            </nav>

            <div className="page-content" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div>
                        <h1 style={{ fontSize: '3rem', margin: 0 }}>Car List</h1>
                        <p style={{ color: '#aaa' }}>Explore and manage our premium collection of vehicles</p>
                    </div>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        style={{ backgroundColor: '#fff', color: '#000', border: 'none', padding: '10px 25px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {isAdding ? "Cancel" : "Add New Car"}
                    </button>
                </div>

                {isAdding && (
                    <form onSubmit={handleAddCar} style={{ backgroundColor: '#111', padding: '30px', borderRadius: '15px', marginBottom: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '15px', alignItems: 'end' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>Car Name</label>
                            <input
                                required
                                value={newCar.name}
                                onChange={e => setNewCar({ ...newCar, name: e.target.value })}
                                placeholder="e.g. Audi R8"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#222', color: '#fff' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>Type</label>
                            <input
                                required
                                value={newCar.type}
                                onChange={e => setNewCar({ ...newCar, type: e.target.value })}
                                placeholder="e.g. Sports"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#222', color: '#fff' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#888' }}>Price</label>
                            <input
                                required
                                value={newCar.price}
                                onChange={e => setNewCar({ ...newCar, price: e.target.value })}
                                placeholder="e.g. $150,000"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#222', color: '#fff' }}
                            />
                        </div>
                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Save Car</button>
                    </form>
                )}

                <div className="car-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {cars.map((car) => (
                        <div key={car.id} className="car-card" style={{ backgroundColor: '#111', border: '1px solid #222', borderRadius: '20px', padding: '25px', transition: 'transform 0.3s ease', position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '15px', right: '15px', color: '#444', fontSize: '0.8rem' }}>ID: {car.id}</span>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{car.name}</h3>
                            <p className="car-type" style={{ color: '#007bff', marginBottom: '5px' }}>{car.type}</p>
                            <p className="car-price" style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px' }}>{car.price}</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="view-btn" style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #333', background: 'transparent', color: '#fff', cursor: 'pointer' }}>Details</button>
                                <button
                                    onClick={() => handleDeleteCar(car.id)}
                                    style={{ padding: '10px', borderRadius: '10px', border: 'none', background: '#ff4d4d22', color: '#ff4d4d', cursor: 'pointer' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarList;
