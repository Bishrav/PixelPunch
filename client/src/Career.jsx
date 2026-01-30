import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./Career.css";
import TeamImage from "./assets/LandingMid.png"; // Reusing a good asset for the hero
import Footer from "./Footer.jsx";
import Sidebar from "./Components/Sidebar.jsx";

function Career() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedPosition, setSelectedPosition] = React.useState("");
    const [formData, setFormData] = React.useState({
        name: "", email: "", phone: "", salary: "", resume: "", coverLetter: ""
    });
    const [status, setStatus] = React.useState(""); // sending, success, error

    const positions = [
        { title: "Sales Manager", location: "Kathmandu, Nepal", type: "Full-time", department: "Sales" },
        { title: "Customer Service Rep", location: "Kathmandu, Nepal", type: "Full-time", department: "Support" },
        { title: "Automotive Technician", location: "Pokhara, Nepal", type: "Full-time", department: "Engineering" },
        { title: "Marketing Specialist", location: "Remote", type: "Part-time", department: "Marketing" },
        { title: "Full Stack Developer", location: "Remote", type: "Full-time", department: "Tech" },
    ];

    const openModal = (position) => {
        setSelectedPosition(position);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setStatus("");
        setFormData({ name: "", email: "", phone: "", salary: "", resume: "", coverLetter: "" });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("http://localhost:5000/api/career/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, position: selectedPosition })
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setTimeout(closeModal, 2000);
            } else {
                setStatus("error");
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

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
        <div className="career-container">
            <Sidebar />
            <nav className="career-nav">
                <h2 className="nav-logo" onClick={() => navigate("/")}>PIXEL PUNCH</h2>
                <div className="nav-links">
                    <button onClick={() => navigate("/Home")} className="nav-btn-glow">Home</button>
                    <button onClick={() => navigate("/shop")} className="nav-btn-glow">Shop</button>
                    <button onClick={() => navigate("/")} className="nav-btn-glow">Landing</button>
                    <button onClick={() => navigate("/about-us")} className="nav-btn-glow">About Us</button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="career-hero">
                <div className="hero-content">
                    <h1 className="glitch-text" data-text="JOIN THE REVOLUTION">JOIN THE REVOLUTION</h1>
                    <p className="hero-subtitle">
                        We are building the future of automotive retail.
                        If you are obsessed with speed, innovation, and design, your desk is waiting.
                    </p>
                    <button className="cta-btn" onClick={() => openModal("General Application")}>View Openings</button>
                </div>
                <div className="hero-visual">
                    <div className="glow-circle-orange"></div>
                    <img src={TeamImage} alt="Team" className="floating-img" />
                </div>
            </section>

            {/* APPLICATION MODAL */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeModal}>&times;</button>
                        <h2>Apply for {selectedPosition}</h2>
                        <form onSubmit={handleSubmit} className="apply-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input name="name" required value={formData.name} onChange={handleChange} placeholder="Pixel Punch" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="career@pixelpunch.com" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                            </div>
                            <div className="form-group">
                                <label>Resume Link (Google Drive/LinkedIn)</label>
                                <input name="resume" required value={formData.resume} onChange={handleChange} placeholder="https://..." />
                            </div>
                            <div className="form-group">
                                <label>Expected Salary</label>
                                <input name="salary" value={formData.salary} onChange={handleChange} placeholder="$60,000" />
                            </div>
                            <div className="form-group full-width">
                                <label>Cover Letter</label>
                                <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows="4" placeholder="Tell us why you belong here..."></textarea>
                            </div>

                            <button type="submit" className="submit-btn" disabled={status === "sending"}>
                                {status === "sending" ? "Sending..." : status === "success" ? "Sent Successfully!" : "Submit Application"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* CULTURE SECTION */}
            <section className="culture-section">
                <h2 className="section-title animate-on-scroll">THE CULTURE</h2>
                <div className="culture-grid">
                    <div className="culture-card glass-panel animate-on-scroll">
                        <div className="icon-box">⚡</div>
                        <h3>Fast Paced</h3>
                        <p>We move fast and break things. Innovation doesn't wait for permission.</p>
                    </div>
                    <div className="culture-card glass-panel animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <div className="icon-box">🤝</div>
                        <h3>Collaborative</h3>
                        <p>No egos. Just a team of passionate petrolheads building something legendary.</p>
                    </div>
                    <div className="culture-card glass-panel animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
                        <div className="icon-box">🌍</div>
                        <h3>Remote First</h3>
                        <p>Work from Kathmandu, Tokyo, or your garage. We value output, not face time.</p>
                    </div>
                </div>
            </section>

            {/* POSITIONS SECTION */}
            <section className="positions-section">
                <h2 className="section-title animate-on-scroll">ACTIVE MISSIONS</h2>
                <div className="positions-list animate-on-scroll">
                    {positions.map((pos, index) => (
                        <div key={index} className="position-row">
                            <div className="pos-info">
                                <h3>{pos.title}</h3>
                                <span className="pos-dept">{pos.department}</span>
                            </div>
                            <div className="pos-meta">
                                <span>📍 {pos.location}</span>
                                <span>⏰ {pos.type}</span>
                            </div>
                            <button className="apply-btn-small" onClick={() => openModal(pos.title)}>Apply</button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Career;
