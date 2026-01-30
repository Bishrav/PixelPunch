import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Components/Sidebar.jsx';
import Footer from './Footer.jsx';
import Car1 from "./assets/Collection1.png"; // Fallback
import "./ProductDetails.css";
import { useAuth } from './hooks/useAuth.js';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    // Checkout Form
    const [checkoutData, setCheckoutData] = useState({
        name: "",
        username: "",
        location: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
                setCar(res.data);

                // Pre-fill username if logged in
                if (user) {
                    setCheckoutData(prev => ({ ...prev, username: user.username }));
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching car:", err);
                setLoading(false);
            }
        };
        fetchCar();
    }, [id, user]);

    const handleBuyNow = () => {
        if (!user) {
            alert("Please login to purchase vehicles.");
            navigate("/login");
            return;
        }
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });
    };

    const handleProceedPayment = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // Simulate payment processing delay
        setTimeout(async () => {
            try {
                const token = localStorage.getItem("token");
                await axios.post(`http://localhost:5000/api/cars/buy/${id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProcessing(false);
                setShowModal(false);

                // Payment Done Toast/Alert
                const toast = document.createElement("div");
                toast.className = "payment-toast";
                toast.innerText = "Payment Successful! 🎉";
                document.body.appendChild(toast);

                setTimeout(() => {
                    toast.remove();
                    navigate("/dashboard");
                }, 3000);

            } catch (err) {
                console.error("Purchase failed", err);
                alert("Purchase failed: " + (err.response?.data?.message || err.message));
                setProcessing(false);
            }
        }, 2000);
    };

    if (loading) return <div className="loading-screen">Loading Machine Data...</div>;
    if (!car) return <div className="error-screen">Car not found or sold.</div>;

    return (
        <div className="product-page">
            <Sidebar />

            <div className="product-container">
                <button className="back-link" onClick={() => navigate("/shop")}>← Back to Shop</button>

                <div className="product-grid">
                    {/* LEFT: Image */}
                    <div className="product-image-section">
                        <img src={car.img || Car1} alt={car.name} className="main-product-img" />
                        <div className="image-glow"></div>
                    </div>

                    {/* RIGHT: Details */}
                    <div className="product-info-section">
                        <span className="brand-tag">{car.brand}</span>
                        <h1 className="product-title">{car.name}</h1>
                        <div className="rating-row">
                            ⭐⭐⭐⭐⭐ <span style={{ color: '#888', fontSize: '0.9rem' }}>(5.0)</span>
                        </div>

                        <div className="price-tag">
                            Rs. {car.price.toLocaleString()}
                        </div>

                        <p className="product-desc">
                            This {car.type} represents the pinnacle of {car.brand} engineering.
                            Aggressive styling, unmatched performance, and a driving experience that defies physics.
                            Instant delivery available to your location.
                        </p>

                        <div className="specs-grid">
                            <div className="spec-item">
                                <label>Type</label>
                                <span>{car.type}</span>
                            </div>
                            <div className="spec-item">
                                <label>Status</label>
                                <span style={{ color: car.status === 'Available' ? '#00ff88' : 'red' }}>{car.status}</span>
                            </div>
                            <div className="spec-item">
                                <label>Delivery</label>
                                <span>Global</span>
                            </div>
                        </div>

                        <button
                            className="buy-now-btn"
                            disabled={car.status !== 'Available'}
                            onClick={handleBuyNow}
                        >
                            {car.status === 'Available' ? "Buy Now" : "Sold Out"}
                        </button>
                    </div>
                </div>
            </div>

            {/* CHECKOUT MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="checkout-modal">
                        <h2>Secure Checkout</h2>
                        <form onSubmit={handleProceedPayment}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input name="name" required value={checkoutData.name} onChange={handleInputChange} placeholder="Pixel Punch" />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input name="username" readOnly value={checkoutData.username} style={{ opacity: 0.7, cursor: 'not-allowed' }} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Delivery Location</label>
                                <input name="location" required value={checkoutData.location} onChange={handleInputChange} placeholder="123 Cyber Street, Neo Tokyo" />
                            </div>

                            <div className="card-section">
                                <h3>Payment Details</h3>
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input name="cardNumber" required placeholder="0000 0000 0000 0000" maxLength="19" value={checkoutData.cardNumber} onChange={handleInputChange} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry</label>
                                        <input name="expiry" required placeholder="MM/YY" maxLength="5" value={checkoutData.expiry} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input name="cvv" required placeholder="123" maxLength="3" value={checkoutData.cvv} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
                                <button type="submit" className="proceed-btn" disabled={processing}>
                                    {processing ? "Processing..." : "Proceed to Payment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ProductDetails;
