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
        <div className="about-container">
            <Sidebar />
            <nav className="about-nav">
                <h2 className="nav-logo" onClick={() => navigate("/")}>PIXEL PUNCH</h2>
                <button onClick={() => navigate("/")} className="nav-btn-glow">Home</button>
            </nav>

            {/* HERO SECTION */}
            <section className="about-hero">
                <div className="hero-content">
                    <h1 className="glitch-text" data-text="THE FUTURE OF DRIVING">THE FUTURE OF DRIVING</h1>
                    <p className="hero-subtitle">Redefining the automotive experience through technology and design.</p>
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
                        <p>Pushing boundaries with AI-driven recommendations and virtual test drives.</p>
                    </div>
                    <div className="mission-card glass-panel animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <div className="icon-box">💎</div>
                        <h3>Premium Quality</h3>
                        <p>Curating only the finest vehicles with verified history and pristine condition.</p>
                    </div>
                    <div className="mission-card glass-panel animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
                        <div className="icon-box">🌍</div>
                        <h3>Global Reach</h3>
                        <p>Connecting enthusiasts worldwide with seamless logistics and support.</p>
                    </div>
                </div>
            </section>

            {/* VISUAL STORY */}
            <section className="story-section">
                <div className="story-content animate-on-scroll">
                    <h2>OUR ORIGIN</h2>
                    <p>
                        Born from a passion for speed and a vision for the future, Pixel Punch started as a digital
                        showroom experiment. Today, it stands as the premier destination for concept cars and
                        high-performance vehicles.
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

            <Footer />
        </div>
    );
}

export default AboutUs;
