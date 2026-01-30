import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./AboutUs.css";
import ConceptCar from "./assets/Collection1.png"; // Reusing high-quality asset
import Mission from "./assets/LandingLeft.png";
import Vision from "./assets/LandingRight.png";
import Footer from "./Footer.jsx";
import Sidebar from "./Components/Sidebar.jsx";

function AboutUs() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-container page-container">
            <Sidebar />
            <nav className="about-nav">
                <h2 className="nav-logo" onClick={() => navigate("/")}>PIXEL PUNCH</h2>
                <div className="nav-links">
                    <button onClick={() => navigate("/Home")} className="nav-btn-glow">Home</button>
                    <button onClick={() => navigate("/shop")} className="nav-btn-glow">Shop</button>
                    <button onClick={() => navigate("/")} className="nav-btn-glow">Landing</button>
                    <button onClick={() => navigate("/career")} className="nav-btn-glow">Career</button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="about-hero">
                <div className="hero-content">
                    <h1 className="glitch-text" data-text="THE FUTURE OF DRIVING">THE FUTURE OF DRIVING</h1>
                    <p className="hero-subtitle">
                        At Pixel Punch, we don't just sell cars; we curate experiences.
                        Merging cutting-edge technology with automotive passion, we provide a platform
                        where the digital meets the asphalt. Explore a world where your dream ride is just a click away.
                    </p>
                </div>
                <div className="hero-visual">
                    <div className="glow-circle"></div>
                    <img src={ConceptCar} alt="Concept Car" className="floating-car" />
                </div>
            </section>

            {/* MISSION CONTROL */}
            <section className="mission-section">
                <h2 className="section-title animate-on-scroll">MISSION CONTROL</h2>
                <div className="mission-grid">
                    <div className="mission-card glass-panel animate-on-scroll">
                        <div className="icon-box">🚀</div>
                        <h3>Innovation</h3>
                        <p>
                            We leverage AI-driven insights to match you with vehicles that fit not just your needs,
                            but your personality. Our virtual showrooms allow you to inspect every inch before you buy.
                        </p>
                    </div>
                    <div className="mission-card glass-panel animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <div className="icon-box">💎</div>
                        <h3>Premium Quality</h3>
                        <p>
                            Every vehicle in our inventory undergoes a rigorous 150-point inspection.
                            We deal only in the finest machinery, ensuring that every curve and engine note is perfection.
                        </p>
                    </div>
                    <div className="mission-card glass-panel animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
                        <div className="icon-box">🌍</div>
                        <h3>Global Reach</h3>
                        <p>
                            From Tokyo drift scenes to Italian hills, we source rare gems from around the globe.
                            Our seamless logistics network delivers your dream directly to your driveway, anywhere on Earth.
                        </p>
                    </div>
                </div>
            </section>

            {/* VISUAL STORY */}
            <section className="story-section">
                <div className="story-content animate-on-scroll">
                    <h2>OUR ORIGIN</h2>
                    <p>
                        Born from a passion for speed and a vision for the future, Pixel Punch started as a digital
                        showroom experiment in a small garage. We noticed a gap in the market: buying a car was boring.
                        It lacked the thrill of the drive itself.
                    </p>
                    <p style={{ marginTop: '20px' }}>
                        Today, we stand as the premier destination for concept cars and high-performance vehicles.
                        We are more than a dealership; we are a community of petrolheads, tech geeks, and dreamers.
                        Welcome to the family.
                    </p>
                </div>
                <div className="story-images animate-on-scroll">
                    <img src={Mission} alt="Our Mission" className="story-img left-tilt" />
                    <img src={Vision} alt="Our Vision" className="story-img right-tilt" />
                </div>
            </section>

            {/* STATS SECTION */}
            <section className="stats-section animate-on-scroll">
                <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Exotic Cars</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">50k+</span>
                    <span className="stat-label">Happy Clients</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Concierge Support</span>
                </div>
            </section>

            <div className="page-content"></div>

            <Footer />
        </div>
    );
}

export default AboutUs;
