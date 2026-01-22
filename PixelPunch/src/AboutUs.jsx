import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./PageTemplate.css";

function AboutUs() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

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
                <h1>About Us</h1>
                <p>Welcome to PixelPunch - Your Premium Car Destination</p>

                <div className="content-section">
                    <h2>Our Story</h2>
                    <p>
                        PixelPunch is a leading automotive platform dedicated to providing the best car buying,
                        renting, and browsing experience. We connect car enthusiasts with their dream vehicles.
                    </p>
                </div>

                <div className="content-section">
                    <h2>Our Mission</h2>
                    <p>
                        To revolutionize the automotive industry by providing a seamless, transparent,
                        and enjoyable experience for all car enthusiasts.
                    </p>
                </div>

                <div className="content-section">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>Wide selection of premium vehicles</li>
                        <li>Transparent pricing with no hidden fees</li>
                        <li>Expert customer service</li>
                        <li>Flexible rental and purchase options</li>
                        <li>Verified customer reviews</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
