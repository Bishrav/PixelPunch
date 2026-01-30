import "./Landing.css";
import Landing from "./assets/Landing.png";
import Landing1 from "./assets/Landing1.png";
import Left from "./assets/LandingLeft.png";
import Mid from "./assets/LandingMid.png";
import Right from "./assets/LandingRight.png";
import HotPrice from "./assets/HotPrice.png"
import Gurantee from "./assets/Guarantee.png"
import CarSale from "./assets/Car Sale.png"
import GreyBackground from "./assets/GreyBackground.png"
import Purchase1 from "./assets/Purchase1.png"
import Purchase2 from "./assets/Purchase2.png"
import Purchase3 from "./assets/Purchase3.png"
import Radio from "./Components/Radio.jsx";
import Gadi from "./assets/Gadi.png"
import New1 from "./assets/New1.png"
import New2 from "./assets/New2.png"
import New3 from "./assets/New3.png"
import New4 from "./assets/New4.png"
import New5 from "./assets/New5.png"
import New6 from "./assets/New6.png"
import Branding from "./assets/Branding.png"
import FlashTimer from "./Components/FlashTimer.jsx";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import { useEffect } from 'react';

import Sidebar from "./Components/Sidebar.jsx";

function LandingPage() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();



    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        });

        document.querySelectorAll('.fade-in-section').forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page page-container">
            {/* <Sidebar /> Removed overlay */}
            <div className="navbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                        style={{ border: 'none', background: 'transparent', padding: '0', boxShadow: 'none' }}
                    >
                        <span className="navbar-toggler-icon" style={{ filter: 'invert(1)', width: '30px', height: '30px' }}></span>
                    </button>
                    <h2 className="nav-logo" onClick={() => navigate("/")} style={{ margin: 0 }}>PIXEL PUNCH</h2>
                    <Sidebar />
                </div>

                <div className="nav-links">
                    <h5 onClick={() => navigate("/Home")} style={{ cursor: 'pointer' }}>Home</h5>
                    <h5 onClick={() => navigate("/about-us")} style={{ cursor: 'pointer' }}>About Us</h5>
                    <h5 onClick={() => navigate("/shop")} style={{ cursor: 'pointer' }}>Shop</h5>
                    <h5 onClick={() => navigate("/career")} style={{ cursor: 'pointer' }}>Career</h5>
                    <h5 onClick={() => navigate("/current-model")} style={{ cursor: 'pointer' }}>Current Model</h5>
                    <h5 onClick={() => navigate("/Contemporary")} style={{ cursor: 'pointer' }}>Contemporary</h5>
                </div>

                <div className="headbut">
                    {!isAuthenticated ? (
                        <>
                            <button onClick={() => navigate("/login")}>Login</button>
                            <button onClick={() => navigate("/register")}>Signup</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/Dashboard")}>Dashboard</button>
                            <button onClick={logout}>Logout</button>
                        </>
                    )}
                </div>
            </div>

            {/* HERO SECTION */}
            <div className="heros">
                <img className="heros-bg" src={Landing1} alt="" />

                <div className="heros-text">
                    <p>NEW TECHNOLOGY & BUILD</p>
                    <h1>LATEST POWERFUL ENGINE FOR YOU</h1>
                    <button className="button" style={{ marginTop: '20px' }} onClick={() => navigate("/offers")}>Discover Now</button>
                </div>

                {/* BRANDING IMAGES */}
                <div className="branding fade-in-section">
                    <div>
                        <img src={Left} alt="" />
                        <div className="branding-txt1">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <button className="button" onClick={() => navigate("/shop")}>Shop Now</button>
                        </div>
                    </div>
                    <div>
                        <img src={Mid} alt="" />
                        <div className="branding-txt2">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <button className="button" onClick={() => navigate("/shop")}>Shop Now</button>
                        </div>
                    </div>
                    <div>
                        <img src={Right} alt="" />
                        <div className="branding-txt3">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <button className="button" onClick={() => navigate("/shop")}>Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------------Market Part-------------------------- */}
            <div className="mid">
                <div className="Market">
                    <img src={HotPrice} alt="" />
                    <div>
                        <h2>Best Price</h2>
                        <p>Get cars at the best market price.</p>
                    </div>
                </div>
                <div className="Market">
                    <img src={Gurantee} alt="" />
                    <div>

                        <h2>Best Price</h2>
                        <p>Get cars at the best market price.</p>
                    </div>
                </div>
                <div className="Market">
                    <img src={CarSale} alt="" />
                    <div>

                        <h2>Best Price</h2>
                        <p>Get cars at the best market price.</p>
                    </div>
                </div>
            </div>

            <div className="viewer">
                <h1>Best Seller</h1>
                <p>All best seller product are now available fro you and your can buy the cars <br />from here any times .</p>
            </div>

            <div className="heros1">
                <img className="heros1-bg" src={GreyBackground} alt="" />
                <div className="Purchase">
                    <div className="purchase-item tilt-card">
                        <img src={Purchase1} alt="" />
                        <div className="Purchase-txt1">
                            <Radio groupId="purchase1" />
                            <p>AERODYNAMIC KIT</p>
                        </div>
                    </div>
                    <div className="purchase-item tilt-card">
                        <img src={Purchase2} alt="" />
                        <div className="Purchase-txt2">
                            <Radio groupId="purchase2" />
                            <p>HIGH PERFORMANCE</p>
                        </div>
                    </div>
                    <div className="purchase-item tilt-card">
                        <img src={Purchase3} alt="" />
                        <div className="Purchase-txt3">
                            <Radio groupId="purchase3" />
                            <p>SPORT TUNING</p>
                        </div>
                    </div>
                </div>
                <div className="heros1-txt">
                    <h1>All kind of parts that <br />You need can find here</h1>
                    <button className="edit" onClick={() => navigate("/offers")}>Explore Now</button>
                </div>
                <span className="mau">
                    <h1>Get you car with the qualitative <br />and cleaned way</h1>
                </span>
                <div className="Gadi">
                    <img src={Gadi} alt="" />

                </div>

            </div>


            {/* IMAGE GALLERY GRID */}
            <div className="gallery-section fade-in-section">
                <h1 className="section-title">EXCLUSIVE COLLECTION</h1>
                <div className="image-grid">
                    <div className="grid-item tilt-card"><img src={New1} alt="Car 1" /></div>
                    <div className="grid-item tilt-card"><img src={New2} alt="Car 2" /></div>
                    <div className="grid-item tilt-card"><img src={New3} alt="Car 3" /></div>
                    <div className="grid-item tilt-card"><img src={New4} alt="Car 4" /></div>
                    <div className="grid-item tilt-card"><img src={New5} alt="Car 5" /></div>
                    <div className="grid-item tilt-card"><img src={New6} alt="Car 6" /></div>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="features-container fade-in-section">
                <h1 className="features-title">WHY CHOOSE US</h1>
                <div className="features-section">
                    <div className="feature-card">
                        <h3>SPEED</h3>
                        <p>0-60 in the blink of an eye.</p>
                    </div>
                    <div className="feature-card">
                        <h3>QUALITY</h3>
                        <p>Hand-picked, premium inventory.</p>
                    </div>
                    <div className="feature-card">
                        <h3>SUPPORT</h3>
                        <p>24/7 dedicated concierge.</p>
                    </div>
                </div>
            </div>

            {/* TESTIMONIALS PARALLAX */}
            <div className="testimonials-section fade-in-section">
                <h2>WHAT OUR CLIENTS SAY</h2>
                <div className="testimonial-card">
                    <p>"The best car buying experience of my life. Pixel Punch delivers excellence."</p>
                    <span>- Alex Sterling</span>
                </div>
                <div className="testimonial-card">
                    <p>"Futuristic, fast, and flawless. I found my dream car here."</p>
                    <span>- Sarah Connor</span>
                </div>
            </div>

            <div className="brand">
                {/* Removed old pic2 container */}

                <div className="division-wrapper">
                    <div className="div-txt">
                        <h1>Flash Deals</h1>
                        <p>Hurry up and get 25% discount </p>
                        <button className="button" onClick={() => navigate("/shop")}>Shop Now</button>
                        <FlashTimer />
                    </div>

                    <img className="divison" src={Branding} alt="" />
                </div>

            </div>

            <div style={{ flex: 1 }}></div>
            <Footer />
        </div>
    );
}
export default LandingPage;
