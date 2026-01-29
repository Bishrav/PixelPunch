import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./PageTemplate.css";

function Career() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const positions = [
        { title: "Sales Manager", location: "Kathmandu, Nepal", type: "Full-time" },
        { title: "Customer Service Representative", location: "Kathmandu, Nepal", type: "Full-time" },
        { title: "Automotive Technician", location: "Pokhara, Nepal", type: "Full-time" },
        { title: "Marketing Specialist", location: "Remote", type: "Part-time" },
    ];

    return (
        <div className="page-container">
            <nav className="page-nav">
                <button onClick={() => navigate("/")} className="nav-btn">← Home</button>
                {isAuthenticated && (
                    <button onClick={() => navigate("/Dashboard")} className="nav-btn">Dashboard</button>
                )}
                <button onClick={() => navigate("/Contemporary")} className="nav-btn">Browse Cars</button>
            </nav>

            <div className="page-content">
                <h1>Career Opportunities</h1>
                <p>Join our team and be part of the automotive revolution</p>

                <div className="content-section">
                    <h2>Why Work With Us?</h2>
                    <ul>
                        <li>Competitive salary and benefits</li>
                        <li>Professional development opportunities</li>
                        <li>Dynamic and inclusive work environment</li>
                        <li>Work with premium automotive brands</li>
                    </ul>
                </div>

                <div className="content-section">
                    <h2>Open Positions</h2>
                    <div className="positions-list">
                        {positions.map((position, index) => (
                            <div key={index} className="position-card">
                                <h3>{position.title}</h3>
                                <p>📍 {position.location}</p>
                                <p>⏰ {position.type}</p>
                                <button className="apply-btn">Apply Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Career;
