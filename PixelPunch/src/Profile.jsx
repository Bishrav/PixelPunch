import ProfileCar from "./assets/Purchase3.png"
import "./Profile.css"
import Call from "./assets/call.png"
import Mail from "./assets/Mail.png"
import Mark from "./assets/mark.png"
import Car from "./assets/ProfCar.png"
import Logo from "./assets/Zap.png"
import Package from "./assets/Package.png"
import { useAuth } from "./hooks/useAuth.js"
import { useNavigate } from "react-router-dom"

function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <section className="Profile">
                <div className="profile-nav">
                    <button onClick={() => navigate("/Dashboard")} className="nav-btn">← Back to Dashboard</button>
                    <button onClick={() => navigate("/Home")} className="nav-btn">Home</button>
                    <button onClick={() => navigate("/Contemporary")} className="nav-btn">Browse Cars</button>
                </div>

                <div className="ProfDiv">
                    <div className="sidebar">
                        <img src={ProfileCar} alt="" />
                    </div>
                    <div className="ProfCon">
                        <h1>{user.username || "User Name"}</h1>
                        <hr />
                        <div className="profdis">
                            <img src={Mail} alt="" />
                            <p>{user.email || "user@example.com"}</p>
                        </div>
                        <div className="profdis">
                            <img src={Call} alt="" />
                            <p>+977 9820423323</p>
                        </div>
                        <div className="profdis">
                            <img src={Mark} alt="" />
                            <p>Kathmandu, Nepal</p>
                        </div>
                    </div>
                </div>

                <div className="ProfHead">
                    <div className="ProfContent">
                        <h1>Account Overview</h1>
                        <div className="ProfCo">
                            <img src={Car} alt="" />
                            <div className="Profdiv">
                                <h1>Car Bought</h1>
                                <p>2</p>
                            </div>
                        </div>
                    </div>

                    <div className="arrange">
                        <div className="ProfContent">
                            <div className="ProfCo">
                                <img src={Logo} alt="" />
                                <div className="Profdiv">
                                    <h1>Cars Rented</h1>
                                    <p>3</p>
                                </div>
                            </div>
                        </div>

                        <div className="ProfContent">
                            <div className="ProfCo">
                                <img src={Package} alt="" />
                                <div className="Profdiv">
                                    <h1>Test Drives</h1>
                                    <p>5</p>
                                </div>
                            </div>
                        </div>

                        <div className="ProfContent">
                            <div className="ProfCo">
                                <img src={Car} alt="" />
                                <div className="Profdiv">
                                    <h1>Favorites</h1>
                                    <p>8</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Profile;