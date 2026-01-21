import NepalClock from "./Components/NepalClock"
import "./Dashboard.css"
import { useNavigate } from "react-router-dom"

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            <div className="background">
                <div className="Nepal">
                    <h1>Welcome back, {user.username || "Guest"}!</h1>
                    <NepalClock />
                    <button onClick={handleLogout} style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: 'none',
                        backgroundColor: 'white',
                        color: '#2353A7',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}>Logout</button>
                </div>
            </div>
        </>
    )
}
export default Dashboard