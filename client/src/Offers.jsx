import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar.jsx';
import Footer from './Footer.jsx';
import Car1 from "./assets/Collection1.png";
import Car2 from "./assets/Collection2.png";
import Car3 from "./assets/Collection3.png";
import Car4 from "./assets/Collection4.png";
import Car5 from "./assets/Collection5.png";
import Car6 from "./assets/Collection6.png";
import Car7 from "./assets/Collection7.png";
import Car8 from "./assets/Collection8.png";

const Offers = () => {
    const navigate = useNavigate();

    const specialOffers = [
        { title: "Summer Blowout", type: "Seasonal", discount: "25% OFF", car: "Range Rover Sport", img: Car1, expires: "2 Days Left" },
        { title: "Executive Lease", type: "Business", discount: "0% APR", car: "Mercedes G-Wagon", img: Car2, expires: "Limited Time" },
        { title: "Trade-In Bonus", type: "Exchange", discount: "+$5000", car: "Any Luxury SUV", img: Car3, expires: "Always On" },
        { title: "First Time Buyer", type: "New User", discount: "Free Insurance", car: "Porsche 911", img: Car4, expires: "New Accounts" },
        { title: "Weekend Warrior", type: "Rental", discount: "Rent 2 Get 1", car: "Off-road Fleet", img: Car5, expires: "Fridays Only" },
        { title: "Family Package", type: "Bundle", discount: "Safety Kit Included", car: "Volvo XC90", img: Car6, expires: "This Month" },
        { title: "Midnight Run", type: "Event", discount: "VIP Access", car: "Lamborghini Urus", img: Car7, expires: "Tonight" },
        { title: "Pre-Order Special", type: "Future", discount: "Early Bird Price", car: "2026 Models", img: Car8, expires: "Limited Slots" }
    ];

    return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
            <Sidebar />

            {/* Nav similar to Contemporary for consistency */}
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
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        style={{
                            border: '1px solid rgba(255,255,255,0.3)',
                            background: 'transparent',
                            padding: '6px 10px',
                            marginRight: '20px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(255,255,255,1)';
                            e.currentTarget.querySelectorAll('span').forEach(s => s.style.background = 'black');
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.querySelectorAll('span').forEach(s => s.style.background = 'white');
                        }}
                    >
                        <span className="navbar-toggler-icon" style={{ display: 'block', width: '20px', height: '2px', background: 'white', marginBottom: '4px', transition: 'background 0.3s' }}></span>
                        <span className="navbar-toggler-icon" style={{ display: 'block', width: '20px', height: '2px', background: 'white', marginBottom: '4px', transition: 'background 0.3s' }}></span>
                        <span className="navbar-toggler-icon" style={{ display: 'block', width: '20px', height: '2px', background: 'white', transition: 'background 0.3s' }}></span>
                    </button>
                    <h2 onClick={() => navigate("/")} style={{ cursor: 'pointer', margin: 0, fontFamily: '"Orbitron", sans-serif', letterSpacing: '3px' }}>PIXEL PUNCH</h2>
                </div>
                <div style={{ display: 'flex', gap: '30px', fontWeight: '500' }}>
                    <span onClick={() => navigate("/Contemporary")} style={{ cursor: 'pointer', opacity: 0.7 }}>Back to Contemporary</span>
                </div>
            </nav>

            <header style={{
                textAlign: 'center',
                padding: '100px 20px',
                background: 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,1) 100%), url(' + Car2 + ')', // Fallback or creative use of assets
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
                    {specialOffers.map((offer, index) => (
                        <div key={index} className="offer-card-page" style={{
                            background: '#111',
                            borderRadius: '25px',
                            overflow: 'hidden',
                            border: '1px solid #222',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            animation: `fadeInUp 0.8s ease forwards ${index * 0.1}s`,
                            opacity: 0
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
                                <img src={offer.img} alt={offer.car} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                    <button style={{
                                        background: 'white',
                                        color: 'black',
                                        border: 'none',
                                        padding: '10px 25px',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.background = '#ddd'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
                                    >
                                        Claim Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Offers;
