import { useAuth } from "./hooks/useAuth.js"
import NepalClock from "./Components/NepalClock"
import "./Dashboard.css"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <div className="background">
                <div className="Nepal">
                    <h1>Welcome back, {user.username || "Guest"}!</h1>
                    <NepalClock />

                    <div className="dashboard-actions">
                        <button onClick={() => navigate("/Profile")} className="action-btn profile-btn">
                            View Profile
                        </button>
                        <button onClick={() => navigate("/Home")} className="action-btn home-btn">
                            Go to Home
                        </button>
                        <button onClick={() => navigate("/Contemporary")} className="action-btn contemporary-btn">
                            Browse Cars
                        </button>
                        <button onClick={handleLogout} className="action-btn logout-btn">
                            Logout
                        </button>
                    </div>

                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <h3>Cars Viewed</h3>
                            <p className="stat-number">12</p>
                        </div>
                        <div className="stat-card">
                            <h3>Favorites</h3>
                            <p className="stat-number">5</p>
                        </div>
                        <div className="stat-card">
                            <h3>Test Drives</h3>
                            <p className="stat-number">2</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard