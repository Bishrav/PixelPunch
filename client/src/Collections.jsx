import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';
import HeroVideo from './assets/videos/Hero.mp4'; // Reusing this or another if found
import Collection1 from "./assets/Collection1.png";
import Collection2 from "./assets/Collection2.png";
import Collection3 from "./assets/Collection3.png";
import Collection4 from "./assets/Collection4.png";
import Collection5 from "./assets/Collection5.png";
import Collection6 from "./assets/Collection6.png";
import Collection7 from "./assets/Collection7.png";
import Collection8 from "./assets/Collection8.png";

const Collections = () => {
    const navigate = useNavigate();

    const collections = [
        { name: "Hyper Sport", year: "2025", img: Collection1, color: "#ff2e63" },
        { name: "Stealth Ops", year: "2024", img: Collection2, color: "#08d9d6" },
        { name: "Vintage Soul", year: "1969", img: Collection3, color: "#eaeaea" },
        { name: "Electric Dream", year: "2030", img: Collection4, color: "#252a34" },
        { name: "Offroad Beast", year: "2024", img: Collection5, color: "#f9ed69" },
        { name: "City Slicker", year: "2025", img: Collection6, color: "#ff9a3c" },
        { name: "Luxury Liner", year: "2024", img: Collection7, color: "#b83b5e" },
        { name: "Concept X", year: "2050", img: Collection8, color: "#6a2c70" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="product-page page-container" style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>

            <nav style={{
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 100,
                height: '90px',
                background: 'rgba(0,0,0,0.9)',
                backdropFilter: 'blur(15px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                animation: 'slideDown 0.8s ease forwards'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h2 onClick={() => navigate("/")} style={{ cursor: 'pointer', margin: 0, fontFamily: '"Orbitron", sans-serif', letterSpacing: '3px', fontSize: '1.8rem' }}>PIXEL PUNCH</h2>
                </div>
                <div style={{ display: 'flex', gap: '30px', fontWeight: '500' }}>
                    <span onClick={() => navigate("/Contemporary")} style={{ cursor: 'pointer', opacity: 0.8, textTransform: 'uppercase' }}>Back</span>
                </div>
            </nav>

            {/* Video Hero */}
            <header style={{
                height: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <video
                    autoPlay muted loop playsInline
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.6
                    }}
                >
                    <source src={HeroVideo} type="video/mp4" />
                </video>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'linear-gradient(to bottom, transparent 0%, black 100%)'
                }}></div>

                <div className="animate-on-scroll" style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    opacity: 0,
                    transform: 'translateY(50px)',
                    transition: 'all 1s ease'
                }}>
                    <h1 style={{
                        fontSize: '6vw',
                        fontFamily: '"Orbitron", sans-serif',
                        letterSpacing: '10px',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                        textShadow: '0 0 20px rgba(255,255,255,0.5)'
                    }}>The Future</h1>
                    <p style={{ fontSize: '1.5rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#ccc' }}>Is Driven By Us</p>
                </div>
            </header>

            {/* Collections Grid */}
            <section style={{ padding: '100px 5vw', position: 'relative' }}>
                <h2 className="animate-on-scroll" style={{
                    fontSize: '3rem',
                    marginBottom: '80px',
                    fontFamily: '"Orbitron", sans-serif',
                    borderLeft: '5px solid white',
                    paddingLeft: '30px',
                    opacity: 0,
                    transform: 'translateX(-50px)',
                    transition: 'all 0.8s ease'
                }}>Curated Collections</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '60px'
                }}>
                    {collections.map((item, index) => (
                        <div
                            key={index}
                            className="collection-card animate-on-scroll"
                            style={{
                                position: 'relative',
                                height: '500px',
                                cursor: 'pointer',
                                opacity: 0,
                                transform: 'translateY(50px)',
                                transition: 'all 0.8s ease',
                                transitionDelay: `${index * 0.1}s`
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.querySelector('.col-img').style.transform = 'scale(1.1)';
                                e.currentTarget.querySelector('.col-overlay').style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.querySelector('.col-img').style.transform = 'scale(1)';
                                e.currentTarget.querySelector('.col-overlay').style.opacity = '0';
                            }}
                        >
                            <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px' }}>
                                <img
                                    className="col-img"
                                    src={item.img}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
                                    }}
                                />
                            </div>

                            {/* Hover Overlay */}
                            <div className="col-overlay" style={{
                                position: 'absolute',
                                top: 0, left: 0, width: '100%', height: '100%',
                                background: `linear-gradient(to top, ${item.color}cc 0%, transparent 100%)`, // Using collection color
                                opacity: 0,
                                transition: 'opacity 0.4s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '40px'
                            }}>
                                <h3 style={{
                                    fontSize: '3rem',
                                    fontFamily: '"Orbitron", sans-serif',
                                    textTransform: 'uppercase',
                                    margin: 0,
                                    transform: 'translateY(0)',
                                    color: 'white'
                                }}>{item.name}</h3>
                                <p style={{ fontSize: '1.2rem', marginTop: '10px', color: 'rgba(255,255,255,0.8)' }}>Edition {item.year}</p>
                                <button style={{
                                    marginTop: '20px',
                                    padding: '10px 30px',
                                    background: 'white',
                                    color: 'black',
                                    border: 'none',
                                    width: 'fit-content',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer'
                                }}>View Series</button>
                            </div>

                            {/* Always visible title (fades out on hover) */}
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                pointerEvents: 'none',
                                mixBlendMode: 'difference'
                            }}>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', fontFamily: '"Orbitron", sans-serif' }}>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid #333' }}>
                <p style={{ color: '#666', letterSpacing: '2px' }}>THE FUTURE OF DRIVING</p>
            </div>

            {/* TECH SPECS SECTION */}
            <section style={{
                padding: '100px 5vw',
                background: '#0a0a0a',
                position: 'relative'
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '50px'
                }}>
                    <div style={{ flex: '1 1 500px' }}>
                        <h2 className="animate-on-scroll" style={{
                            fontSize: '4rem',
                            fontFamily: '"Orbitron", sans-serif',
                            marginBottom: '30px',
                            color: 'white',
                            lineHeight: 1
                        }}>ENGINEERED <br /><span style={{ color: '#00ff88' }}>PERFECTION</span></h2>
                        <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '40px', lineHeight: 1.6 }}>
                            Every curve is calculated. Every material chosen for performance. Our collections represent the pinnacle of automotive engineering, merging sustainable innovation with raw power.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            {[
                                { label: "0-60 MPH", val: "1.9s" },
                                { label: "Top Speed", val: "250+" },
                                { label: "Range", val: "600mi" },
                                { label: "Charge", val: "5min" }
                            ].map((stat, i) => (
                                <div key={i} className="animate-on-scroll" style={{
                                    opacity: 0,
                                    padding: '20px',
                                    border: '1px solid #333',
                                    borderRadius: '10px',
                                    transition: `all 0.5s ease ${i * 0.1}s`
                                }}>
                                    <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'white', fontFamily: '"Orbitron", sans-serif' }}>{stat.val}</h3>
                                    <p style={{ margin: 0, color: '#666', textTransform: 'uppercase', fontSize: '0.9rem' }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: '1 1 500px', height: '500px', background: `url(${HeroVideo}) center/cover` }}>
                        {/* Placeholder for a cool image or 3D model */}
                        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, borderRadius: '20px' }}>
                            <source src={HeroVideo} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </section>

            {/* GALLERY SCROLL */}
            <section style={{ overflow: 'hidden', padding: '100px 0', background: 'black' }}>
                <h2 className="animate-on-scroll" style={{ textAlign: 'center', fontSize: '3rem', fontFamily: '"Orbitron", sans-serif', marginBottom: '50px' }}>EXCLUSIVE GALLERY</h2>
                <div style={{ display: 'flex', gap: '20px', animation: 'scroll-left 40s linear infinite', width: 'max-content' }}>
                    {[Collection1, Collection2, Collection3, Collection4, Collection5, Collection6, Collection7, Collection8, Collection1, Collection2].map((img, i) => (
                        <img key={i} src={img} alt="Gallery" style={{
                            width: '400px',
                            height: '300px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            filter: 'grayscale(100%)',
                            transition: 'filter 0.3s'
                        }}
                            onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
                            onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%)'}
                        />
                    ))}
                </div>
            </section>

            <style>
                {`
                    .visible {
                        opacity: 1 !important;
                        transform: translate(0, 0) !important;
                    }
                `}
            </style>

            <div className="page-content"></div>

            <Footer />
        </div >
    );
};

export default Collections;
