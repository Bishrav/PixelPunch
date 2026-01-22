import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import "./PageTemplate.css";

function CarList() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const cars = [
        { name: "Range Rover", type: "SUV", price: "$95,000" },
        { name: "Porsche 911", type: "Sports", price: "$120,000" },
        { name: "Lamborghini Aventador", type: "Supercar", price: "$450,000" },
        { name: "G-Wagon", type: "SUV", price: "$140,000" },
        { name: "Tesla Model S", type: "Electric", price: "$90,000" },
        { name: "BMW M5", type: "Sedan", price: "$105,000" },
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
                <h1>Car List</h1>
                <p>Explore our premium collection of vehicles</p>

                <div className="car-grid">
                    {cars.map((car, index) => (
                        <div key={index} className="car-card">
                            <h3>{car.name}</h3>
                            <p className="car-type">{car.type}</p>
                            <p className="car-price">{car.price}</p>
                            <button className="view-btn">View Details</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarList;
