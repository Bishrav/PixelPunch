import "./Home.css";
import Logo from "./assets/Hero.svg";
import Hero from "./assets/videos/Hero.mp4";
import Car1 from "./assets/Car1.png";
import Icon from "./assets/Icon.png";
import Brand1 from "./assets/Brand1.png"
import Brand2 from "./assets/Brand2.png"
import Brand3 from "./assets/Brand3.png"
import { useEffect } from "react";
import Card1 from "./assets/card1.png"
import Card2 from "./assets/Card2.png"
import Social from "./assets/Social.png"
import Social1 from "./assets/Social1.png"
import Social2 from "./assets/Social2.png"

import Social4 from "./assets/Social4.png"
import New1 from "./assets/New1.png"
import New2 from "./assets/New2.png"
import New3 from "./assets/New3.png"
import Electric1 from "./assets/Purchase1.png"
import Electric2 from "./assets/Purchase2.png"

import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";

import Sidebar from "./Components/Sidebar.jsx";

export default function Home() {
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
        <>
            {/* Sidebar Overlay Removed - handled by Bootstrap or not needed */}
            <nav className="top-navbar">
                <div className="nav-left">
                    <nav className="navbar fixed-top" style={{ padding: '20px 50px', background: 'transparent' }}>
                        <div className="container-fluid">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar"
                                aria-label="Toggle navigation"
                                style={{ border: 'none', background: 'transparent', padding: '0', boxShadow: 'none' }}
                            >
                                <span className="navbar-toggler-icon" style={{ width: '35px', height: '35px' }}></span>
                            </button>
                            <Sidebar />
                        </div>
                    </nav>
                </div>

                <div className="nav-center">
                    <img src={Logo} alt="logo" className="nav-logo" onClick={() => navigate("/")} style={{ cursor: 'pointer', height: '100px', transition: 'height 0.3s ease' }} />
                </div>

                <div className="nav-right">
                    {isAuthenticated ? (
                        <span className="nav-text" onClick={() => navigate("/Dashboard")} style={{ cursor: 'pointer' }}>DASHBOARD</span>
                    ) : (
                        <span className="nav-text" onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>LOGIN</span>
                    )}
                </div>
            </nav>

            {/* NAVBAR LINE */}
            <div className="nav-line"></div>

            {/* HERO SECTION */}
            <div className="hero">
                <video
                    controls={false}
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={Hero} className="hero-bg" alt="hero" />

                {/* TEXT */}
                <div className="hero-text">
                    <h1 className="hero-title" title="PIXEL">PIXEL</h1>
                    <p className="hero-subtitle">PUNCH</p>
                </div>

                {/* BUTTON */}
                <button className="discover-btn">DISCOVER NOW</button>
            </div>

            <div>
                <div className="flex fade-in-section">
                    <div className="tilt-card">
                        <img src={Car1} alt="Car1" />
                        <h4>Range Rover</h4>
                        <p>Go anywhere, composed everywhere.</p>
                        <button>
                            Explore <img src={Icon} alt="" /></button>

                    </div>
                    <div className="tilt-card">
                        <img src={Car1} alt="Car1" />
                        <h4>Range Rover</h4>
                        <p>Go anywhere, composed everywhere.</p>
                        <button>
                            Explore <img src={Icon} alt="" /></button>
                    </div>
                    <div className="tilt-card">
                        <img src={Car1} alt="Car1" />
                        <h4>Range Rover</h4>
                        <p>Go anywhere, composed everywhere.</p>
                        <button>
                            Explore <img src={Icon} alt="" /></button>
                    </div>
                </div>
                <div className="brand">
                    <div className="ad tilt-card fade-in-section">
                        <img src={Brand1} alt="" />
                        <h4>Flexible Rental</h4>
                        <p>Cancel or change most bookings for free up to 48 hours before pick-up</p>
                    </div>
                    <div className="ad tilt-card fade-in-section">
                        <img src={Brand2} alt="" />
                        <h4>No Hidden Fees </h4>
                        <p>Know exactly what you are doing</p>
                    </div>
                    <div className="ad tilt-card fade-in-section">
                        <img src={Brand3} alt="" />
                        <h4>5 Millions+ reviews </h4>
                        <p>By review, verified customers</p>
                    </div>
                </div>
            </div >

            <div className="Third fade-in-section">
                <div className="header">
                    <h1>UNVEIL NEW PERSPECTIVE</h1>
                    <p>Continue your journey with us</p>
                </div>
                <div className="cards">
                    <div className="carousel tilt-card">
                        <img src={Card1} alt="" />
                        <h2>TEST DRIVE RANGE ROVER</h2>
                        <h3>Choose a time and location convenient to you </h3>
                        <p style={{ padding: "50px" }}> BOOK YOUR TEST DRIVE </p>
                    </div>
                    <div className="carousel tilt-card">
                        <img src={Card2} alt="" />
                        <h2>SHOP RANGE ROVER </h2>
                        <h3>Configure and order your new Range Rover online </h3>
                        <p style={{ padding: "50px" }}>BUILD AND ORDER </p>
                    </div>
                </div>
            </div >

            <h1 className="family fade-in-section" style={{ marginTop: '100px' }}>Know Our Family</h1>
            <div className="thirdlast fade-in-section">

                <div>
                    <p>Number of people Connected.</p>
                    <h1>13M+</h1>
                </div>
                {/* backend api creation for user login */}
                <div>
                    <p>Our Total Rentals</p>
                    <h1>3M+</h1>
                </div>
            </div>
            <div className="heroine">
                <div className="heroine-text">
                    <h1>JEEP RIDE</h1>
                    <p>"Drive the Himalayas, <br /> Live the Adventure."</p>
                </div>

                <button className="rentu-button">
                    Rent Now <span>→</span>
                </button>
            </div>
            <footer>
                <div className="foot">
                    <div>
                        <ul>
                            <li className="top">Vehicles</li>
                            <li>Range Rover</li>
                            <li>RANGE ROVER SPORT</li>
                            <li>RANGE ROVER VELAR </li>
                            <li>RANGE ROVER EVOQUE</li>
                            <li>SV</li>
                            <li>FLEET AND BUSINESS</li>
                            <li>DIPLOMATIC SALES </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className="top">OWNERSHIP</li>
                            <li>OWNERSHIP</li>
                            <li>INCONTROL</li>
                            <li>Software Controls</li>

                        </ul>
                        <ul>
                            <li className="top">About Us</li>
                            <li>JLR</li>
                            <li>Sustainability</li>
                            <li>Vechile Data Emissions</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className="top">Our Brands</li>
                            <li>Range Rover</li>
                            <li>Defender</li>
                            <li>Discovery</li>
                            <li>Jaguar</li>
                        </ul>
                    </div>
                    <div className="last">
                        <ul>
                            <li className="top">Join The Conversation</li>
                            <li> <img src={Social} alt="" />Instagram</li>
                            <li> <img src={Social1} alt="" />Facebook</li>
                            <li> <img src={Social2} alt="" />Twitter</li>
                            <li> <img src={Social4} alt="" />linkedin</li>
                        </ul>
                    </div>

                </div>

            </footer >

        </>
    );
}
