import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./PageTemplate.css";

function CurrentModel() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const models = [
        {
            name: "Range Rover 2024",
            features: ["Luxury Interior", "Advanced Safety", "Hybrid Engine"],
            status: "Available Now"
        },
        {
            name: "Porsche 911 Turbo S",
            features: ["640 HP", "0-60 in 2.6s", "Premium Sound"],
            status: "Pre-Order"
        },
        {
            name: "Tesla Model S Plaid",
            features: ["1,020 HP", "Autopilot", "Long Range"],
            status: "Available Now"
        },
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
                <h1>Current Models</h1>
                <p>Discover our latest and most popular models</p>

                <div className="models-grid">
                    {models.map((model, index) => (
                        <div key={index} className="model-card">
                            <h2>{model.name}</h2>
                            <div className="features">
                                <h3>Key Features:</h3>
                                <ul>
                                    {model.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className="status">{model.status}</p>
                            <button className="configure-btn">Configure & Order</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CurrentModel;
