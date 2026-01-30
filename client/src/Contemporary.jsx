import "./Contemporary.css";
import Logo from "./assets/ContLogo.png";
import Profile from "./assets/Profile.png";
import Cart from "./assets/Cart.png";
import Search from "./assets/Search.png";
import Hero from "./assets/HeroIm.png";
import Card from "./Components/Card";
import Footer from "./Footer";
import Car1 from "./assets/Collection1.png";
import Car2 from "./assets/Collection2.png";
import Car3 from "./assets/Collection3.png";
import Car4 from "./assets/Collection4.png";
import Car5 from "./assets/Collection5.png";
import Car6 from "./assets/Collection6.png";
import Car7 from "./assets/Collection7.png";
import Car8 from "./assets/Collection8.png";
import New1 from "./assets/New1.png"
import New2 from "./assets/New2.png"
import New3 from "./assets/New3.png"
import New4 from "./assets/New4.png"
import New5 from "./assets/New5.png"
import New6 from "./assets/New6.png"
import Gwagon from "./assets/Gwagon.png"
import lamborghini from "./assets/lamborghini.png"
import porsche from "./assets/porsche.png"
import Arrrow from "./assets/Arrow 4.png"
import Customer from "./assets/Vector.png"
import sheild from "./assets/shield.png"
import Line from "./assets/Line.png"


import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";

import CheckoutModal from './Components/CheckoutModal.jsx';
import axios from 'axios';

const cars = [Car1, Car2, Car3, Car4, Car5, Car6, Car7, Car8];
const cars1 = [New1, New2, New3, New4, New5, New6, Car7, Car8];

function Contemporary() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClaim = (item) => {
        if (!isAuthenticated) {
            alert("Please login to claim offers");
            navigate("/login");
            return;
        }
        setSelectedItem(item);
        setShowModal(true);
    };

    const handlePaymentComplete = async (checkoutData) => {
        try {
            const token = localStorage.getItem("token");
            // Log activity
            await axios.post("http://localhost:5000/api/activity/log", {
                action: "Contemporary Order",
                details: `Ordered ${selectedItem.title} - ${selectedItem.desc}`
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setShowModal(false);
            const toast = document.createElement("div");
            toast.className = "payment-toast";
            toast.innerText = "Order Placed Successfully! 🎉";
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
                navigate("/dashboard");
            }, 3000);
        } catch (err) {
            console.error("Order failed", err);
            alert("Order processing failed.");
        }
    };

    return (
        <section className="contemporary">
            {/* NO CHANGES ABOVE THIS POINT - navbar and hero remain same */}
            <nav className="navbar">
                <img src={Logo} alt="Logo" className="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }} />

                <div className="nav-links">
                    <span onClick={() => navigate("/Home")} style={{ cursor: 'pointer' }}>Home</span>
                    <span onClick={() => navigate("/shop")} style={{ cursor: 'pointer' }}>Shop</span>
                    <span onClick={() => navigate("/collections")} style={{ cursor: 'pointer' }}>Collections</span>
                    <span onClick={() => navigate("/categories")} style={{ cursor: 'pointer' }}>Categories</span>
                    <span onClick={() => navigate("/offers")} style={{ cursor: 'pointer' }}>Offers</span>
                </div>

                <div className="nav-icons">
                    {!isAuthenticated ? (
                        <>
                            <button onClick={() => navigate("/login")} style={{
                                background: 'transparent',
                                border: '1px solid black',
                                padding: '5px 15px',
                                borderRadius: '15px',
                                cursor: 'pointer'
                            }}>Login</button>
                            <img src={Profile} alt="Profile" onClick={() => navigate("/register")} style={{ cursor: 'pointer' }} />
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/Dashboard")} style={{
                                background: 'transparent',
                                border: '1px solid black',
                                padding: '5px 15px',
                                borderRadius: '15px',
                                cursor: 'pointer'
                            }}>Dashboard</button>
                            <button onClick={logout} style={{
                                background: 'transparent',
                                border: '1px solid black',
                                padding: '5px 15px',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                marginLeft: '10px'
                            }}>Logout</button>
                        </>
                    )}
                    <img src={Search} alt="Search" />
                    <img src={Cart} alt="Cart" />
                </div>
            </nav>

            {/* HERO */}
            <div className="hero">
                <img src={Hero} alt="Hero" className="hero-img" />

                <div className="hero-text">
                    <h1>
                        FREE GIFT <br /> WITH <br /> EVERY <br /> PURCHASE
                    </h1>
                </div>
            </div>

            {/* BRAND SECTION */}
            <div className="brand">
                <h1>Car Collection</h1>
                <button>New Collection</button>
            </div>

            {/* COLLECTION GRID */}
            <div className="collection-wrapper">
                <div className="collection-track">
                    {cars.concat(cars).map((car, index) => (
                        <img key={index} src={car} alt="Car" />
                    ))}
                </div>
                <div className="collection-track">
                    {cars.concat(cars1).map((car, index) => (
                        <img key={index} src={car} alt="Car" />
                    ))}
                </div>
            </div>
            <button className="seller">Bestseller</button>
            <div className="more">
                <img src={Gwagon} alt="" />
                <img src={porsche} alt="" />
                <img src={lamborghini} alt="" />
                <div className="more-txt">
                    <p>G wagon Tank</p>
                    <p>Porsche 911</p>
                    <p>Lamborgini</p>
                </div>
            </div>
            <div className="haveto">
                <h1>Join Our Mailing List And <br />Recieve A 10% Discount Code</h1>
                <input type="text" placeholder="Enter your email" />
                <button ><img src={Arrrow} alt="" /></button>
            </div>

            <div className="customcare">
                <div className="first">
                    <img src={Customer} alt="" />
                    <p>Customer Service <br />Reach out to out team if you need any help</p>

                </div>
                <div className="third">
                    <img src={Line} alt="" />
                </div>
                <div className="second">
                    <img src={sheild} alt="" />
                    <p>Secure Payment <br />Your payment information is processed securely</p>
                </div>
            </div>
            <div className="heading">
                <h1>~Latest Article~</h1>
            </div>
            <div className="card-section">
                <Card />
                <Card />
                <Card />
            </div>

            {/* ANIMATED OFFERS SECTION */}
            <div className="offers-section" style={{ padding: '80px 20px', background: '#0a0a0a', color: 'white' }}>
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '3rem',
                    marginBottom: '50px',
                    fontFamily: '"Orbitron", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    background: 'linear-gradient(to right, #fff, #666)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>Exclusive Offers</h1>

                <div className="offers-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {[
                        { title: "Summer Sale", desc: "Get 20% off on all SUVs", price: "start from $50k", img: Car1 },
                        { title: "Flash Deal", desc: "Limited time offer for Sports edition", price: "start from $120k", img: Car2 },
                        { title: "Loyalty Bonus", desc: "Upgrade your old car with bonus", price: "Exchange Offer", img: Car3 },
                        { title: "Zero Down", desc: "Drive away with $0 down payment", price: "0% APR", img: Car4 },
                        { title: "Corporate", desc: "Special rates for business fleets", price: "Bulk Discount", img: Car5 },
                        { title: "Student Plan", desc: "Disclaimer: Rich students only", price: "10% Off", img: Car6 },
                        { title: "Weekend Special", desc: "Test drive and win vouchers", price: "Free Gifts", img: Car7 },
                        { title: "Vip Access", desc: "Pre-order 2026 models now", price: "Priority", img: Car8 },
                    ].map((offer, i) => (
                        <div key={i} className="offer-card" style={{
                            position: 'relative',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            background: '#1a1a1a',
                            border: '1px solid #333',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer',
                            animation: `fadeInUp 0.6s ease forwards ${i * 0.1}s`,
                            opacity: 0 // Start hidden for animation
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
                                e.currentTarget.querySelector('.offer-img').style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.querySelector('.offer-img').style.transform = 'scale(1)';
                            }}
                        >
                            <div style={{ overflow: 'hidden', height: '200px' }}>
                                <img className="offer-img" src={offer.img} alt={offer.title} style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease'
                                }} />
                            </div>
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{offer.title}</h3>
                                <p style={{ color: '#aaa', marginBottom: '15px' }}>{offer.desc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{
                                        color: '#00ff88',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem'
                                    }}>{offer.price}</span>
                                    <button onClick={() => handleClaim(offer)} style={{
                                        padding: '8px 20px',
                                        background: 'white',
                                        color: 'black',
                                        border: 'none',
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}>Claim</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <footer>
                <Footer />
            </footer>

            <CheckoutModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onPaymentComplete={handlePaymentComplete}
                user={user}
                itemName={selectedItem?.title}
            />
        </section>
    );
}

export default Contemporary;
