import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar.jsx';
import Footer from './Footer.jsx';
import axios from 'axios';
import Car2 from "./assets/Collection2.png"; // Fallback image
import CheckoutModal from './Components/CheckoutModal.jsx';
import { useAuth } from './hooks/useAuth.js';

const Offers = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [offers, setOffers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/offers");
                setOffers(res.data);
            } catch (err) {
                console.error("Error fetching offers", err);
            }
        };
        fetchOffers();
    }, []);

    const handleClaimClick = (offer) => {
        if (!user) {
            alert("Please login to claim offers");
            navigate("/login");
            return;
        }
        setSelectedOffer(offer);
        setShowModal(true);
    };

    const handlePaymentComplete = async (checkoutData) => {
        try {
            const token = localStorage.getItem("token");
            // Log activity to Dashboard

            // Call the claim endpoint which handles:
            // 1. Creating a Sold car record (updates Dashboard stats)
            // 2. Deleting the offer (removes from list)
            // 3. Logging activity
            await axios.post(`http://localhost:5000/api/offers/claim/${selectedOffer.id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local state to remove the offer immediately without refetch
            setOffers(prev => prev.filter(o => o.id !== selectedOffer.id));

            setShowModal(false);
            const toast = document.createElement("div");
            toast.className = "payment-toast";
            toast.innerText = "Offer Claimed Successfully! 🎉";
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
                navigate("/dashboard");
            }, 3000);
        } catch (err) {
            console.error("Claim failed", err);
            alert("Claim processing failed.");
        }
    };

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
            <Sidebar />

            {/* Navbar ... */}
            <nav style={{
                padding: '10px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 100,
                height: '70px',
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(15px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                animation: 'slideDown 0.8s ease forwards'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 onClick={() => navigate("/")} style={{ cursor: 'pointer', margin: 0, fontFamily: '"Orbitron", sans-serif', letterSpacing: '3px' }}>PIXEL PUNCH</h2>
                </div>
                <div style={{ display: 'flex', gap: '30px', fontWeight: '500' }}>
                    <span onClick={() => navigate("/Contemporary")} style={{ cursor: 'pointer', opacity: 0.7 }}>Back to Contemporary</span>
                </div>
            </nav>

            <header style={{
                textAlign: 'center',
                padding: '100px 20px',
                background: 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,1) 100%), url(' + Car2 + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h1 style={{ fontSize: '4rem', textTransform: 'uppercase', letterSpacing: '8px', marginBottom: '20px', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                        Exclusive Offers
                    </h1>
                    <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', color: '#ccc' }}>
                        Discover unbeatable deals on the world's finest machinery. Limitless performance, limited time pricing.
                    </p>
                </div>
            </header>

            <div style={{ padding: '50px 80px', maxWidth: '1600px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '40px'
                }}>
                    {offers.map((offer, index) => (
                        <div key={index} className="offer-card-page" style={{
                            background: '#111',
                            borderRadius: '25px',
                            overflow: 'hidden',
                            border: '1px solid #222',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            animation: `fadeInUp 0.8s ease forwards ${index * 0.1}s`
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-15px)';
                                e.currentTarget.style.boxShadow = '0 30px 60px rgba(255, 68, 68, 0.15)';
                                e.currentTarget.style.borderColor = '#444';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = '#222';
                            }}
                        >
                            <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                                <img src={offer.img || Car2} alt={offer.car} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(255, 68, 68, 0.9)',
                                    color: 'white',
                                    padding: '5px 15px',
                                    borderRadius: '50px',
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem'
                                }}>
                                    {offer.discount}
                                </div>
                            </div>
                            <div style={{ padding: '30px' }}>
                                <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{offer.type}</div>
                                <h2 style={{ fontSize: '1.8rem', margin: '10px 0', fontFamily: '"Orbitron", sans-serif' }}>{offer.title}</h2>
                                <p style={{ color: '#bbb' }}>Applies to: <span style={{ color: 'white' }}>{offer.car}</span></p>

                                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#ff4444' }}>{offer.expires}</span>
                                    <button onClick={() => handleClaimClick(offer)} style={{
                                        background: 'white',
                                        color: 'black',
                                        border: 'none',
                                        padding: '10px 25px',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}>
                                        Claim Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {offers.length === 0 && <div style={{ color: '#666', gridColumn: '1/-1', textAlign: 'center' }}>No offers active currently. Check back soon.</div>}
                </div>
            </div>

            <Footer />
            <CheckoutModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onPaymentComplete={handlePaymentComplete}
                user={user}
                itemName={selectedOffer?.title}
            />
        </div>
    );
};

export default Offers;
