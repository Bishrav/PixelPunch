import React from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Car1 from "./assets/Collection1.png";
import Car2 from "./assets/Collection2.png";
import Car5 from "./assets/Collection5.png";
import Engine from "./assets/Ford-Mustand.png"; // Placeholder Reuse

function Categories() {
    const navigate = useNavigate();

    const categories = [
        { title: "Hypercars", subtitle: "Speed Redefined", img: Car1, desc: "The pinnacle of automotive engineering, designed for those who refuse to compromise." },
        { title: "Luxury SUVs", subtitle: "Command the Road", img: Car2, desc: "Unmatched comfort meets rugged capability. Dominate any terrain in style." },
        { title: "Electric Future", subtitle: "Silent Power", img: Car5, desc: "Zero emissions, infinite torque. Experience the next generation of driving." },
        { title: "Classics", subtitle: "Timeless Elegance", img: Engine, desc: "Restored legends that carry the soul of the golden age of motoring." },
    ];

    return (
        <div className="categories-container">
            <Sidebar />

            <nav className="cat-nav">
                <div className="cat-logo" onClick={() => navigate("/")}>PIXEL PUNCH</div>
                <div className="cat-links">
                    <span className="cat-link" onClick={() => navigate("/Home")}>Home</span>
                    <span className="cat-link" onClick={() => navigate("/shop")}>Shop</span>
                    <span className="cat-link" onClick={() => navigate("/Contemporary")}>Contemporary</span>
                </div>
            </nav>

            {/* HERO */}
            <header className="cat-hero">
                <h1>Unveil The Future</h1>
                <p>Explore our curated arsenal of automotive excellence. From asphalt-shredding hypercars to precision-engineered components.</p>
            </header>

            {/* CATEGORIES GRID */}
            <section className="cat-grid-section">
                <div className="section-header">
                    <h2>Our Arsenal</h2>
                    <p>Choose your weapon of choice.</p>
                </div>
                <div className="cat-grid">
                    {categories.map((cat, index) => (
                        <div key={index} className="cat-card">
                            <img src={cat.img} alt={cat.title} className="cat-card-img" />
                            <div className="cat-info">
                                <h3>{cat.title}</h3>
                                <span>{cat.subtitle}</span>
                                <p>{cat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PARTS & ENGINEERING */}
            <section className="parts-section">
                <div className="section-header">
                    <h2>Parts & Engineering</h2>
                    <p>We build monsters, not just drive them.</p>
                </div>
                <div className="parts-flex">
                    <div className="parts-text">
                        <h3>Precision Components</h3>
                        <p style={{ fontFamily: 'Inter', color: '#ccc', marginBottom: '20px' }}>
                            Pixel Punch isn't just a dealership; it's a sanctuary for gearheads.
                            Our inventory includes rare components and custom tuning kits tailored for maximum performance.
                        </p>
                        <ul>
                            <li>Stage 3 Turbo Kits & Intercoolers</li>
                            <li>Carbon Ceramic Brake Systems</li>
                            <li>Custom ECU Tuning & Mapping</li>
                            <li>Aerodynamic Body Kits (Carbon Fiber)</li>
                        </ul>
                    </div>
                    <div className="parts-visual"></div>
                </div>
            </section>

            {/* VISION SECTION */}
            <section className="vision-section">
                <div className="vision-box">
                    <h2>The Vision</h2>
                    <p>
                        We believe the car is more than a machine—it is an extension of the human will.
                        At Pixel Punch, our mission is to connect drivers with vehicles that ignite the soul.
                        We don't just sell cars; we curate experiences that blur the line between technology and art.
                        Welcome to the new era of automotive retail.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Categories;
