import "./Landing.css";
import Landing from "./assets/Landing.png";
import Landing1 from "./assets/Landing1.png";
import Left from "./assets/LandingLeft.png";
import Mid from "./assets/LandingMid.png";
import Right from "./assets/LandingRight.png";
import HotPrice from "./assets/HotPrice.png"
import Gurantee from "./assets/Guarantee.png"
import CarSale from "./assets/Car Sale.png"
import GreyBackground from "./assets/GreyBackground.png"
import Purchase1 from "./assets/Purchase1.png"
import Purchase2 from "./assets/Purchase2.png"
import Purchase3 from "./assets/Purchase3.png"
import Radio from "./Components/Radio.jsx";
import Gadi from "./assets/Gadi.png"
import New1 from "./assets/New1.png"
import New2 from "./assets/New2.png"
import New3 from "./assets/New3.png"
import New4 from "./assets/New4.png"
import New5 from "./assets/New5.png"
import New6 from "./assets/New6.png"
import Branding from "./assets/Branding.png"
import FlashTimer from "./Components/FlashTimer.jsx";
import Footer from "./Footer.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";

function LandingPage() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    // Helper function to handle navigation with auth check
    const handleNavigation = (path) => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        console.log("handleNavigation called:", {
            path,
            isAuthenticated,
            hasToken: !!token,
            hasUser: !!user,
            token: token ? token.substring(0, 20) + "..." : null
        });

        if (isAuthenticated) {
            console.log("User is authenticated, navigating to:", path);
            navigate(path);
        } else {
            console.log("User NOT authenticated, redirecting to register");
            navigate("/register");
        }
    };

    console.log("LandingPage render - isAuthenticated:", isAuthenticated);

    return (
        <div className="landing-page">
            <div className="navbar">
                <img src={Landing} alt="logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }} />

                <div className="nav-links">
                    <h5 onClick={() => navigate("/Home")} style={{ cursor: 'pointer' }}>Home</h5>
                    <h5 onClick={() => handleNavigation("/about-us")} style={{ cursor: 'pointer' }}>About Us</h5>
                    <h5 onClick={() => handleNavigation("/car-list")} style={{ cursor: 'pointer' }}>Car List</h5>
                    <h5 onClick={() => handleNavigation("/career")} style={{ cursor: 'pointer' }}>Career</h5>
                    <h5 onClick={() => handleNavigation("/current-model")} style={{ cursor: 'pointer' }}>Current Model</h5>
                    <h5 onClick={() => navigate("/Contemporary")} style={{ cursor: 'pointer' }}>Contemporary</h5>
                </div>

                <div className="headbut">
                    {!isAuthenticated ? (
                        <>
                            <button onClick={() => navigate("/login")}>Login</button>
                            <button onClick={() => navigate("/register")}>Signup</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/Dashboard")}>Dashboard</button>
                            <button onClick={logout}>Logout</button>
                        </>
                    )}
                </div>
            </div>

            {/* HERO SECTION */}
            <div className="heros">
                <img className="heros-bg" src={Landing1} alt="" />

                <div className="heros-text">
                    <p>NEW TECHNOLOGY & BUILD</p>
                    <h1>LATEST POWERFUL ENGINE FOR YOU</h1>
                    <button className="button">Shop Now</button>
                </div>

                {/* BRANDING IMAGES */}
                <div className="branding">
                    <div>
                        <img src={Left} alt="" />
                        <div className="branding-txt1">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <button className="button">Shop Now</button>
                        </div>
                    </div>
                    <div>
                        <img src={Mid} alt="" />
                        <div className="branding-txt2">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <button className="button">Shop Now</button>
                        </div>
                    </div>
                    <div>
                        <img src={Right} alt="" />
                        <div className="branding-txt3">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <button className="button">Shop Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------------Market Part-------------------------- */}
            <div className="mid">
                <div className="Market">
                    <img src={HotPrice} alt="" />
                    <div>
                        <h2>Best Price</h2>
                        <p>Get cars at the best market price.</p>
                    </div>
                </div>
                <div className="Market">
                    <img src={Gurantee} alt="" />
                    <div>

                        <h2>Best Price</h2>
                        <p>Get cars at the best market price.</p>
                    </div>
                </div>
                <div className="Market">
                    <img src={CarSale} alt="" />
                    <div>

                        <h2>Best Price</h2>
                        <p>Get cars at the best market price.</p>
                    </div>
                </div>
            </div>

            <div className="viewer">
                <h1>Best Seller</h1>
                <p>All best seller product are now available fro you and your can buy the cars <br />from here any times .</p>
            </div>

            <div className="heros1">
                <img className="heros1-bg" src={GreyBackground} alt="" />
                <div className="Purchase">
                    <div className="purchase-item">
                        <img src={Purchase1} alt="" />
                        <div className="Purchase-txt1">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <Radio groupId="purchase1" />
                        </div>
                    </div>
                    <div className="purchase-item">
                        <img src={Purchase2} alt="" />
                        <div className="Purchase-txt2">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <Radio groupId="purchase2" />
                        </div>
                    </div>
                    <div className="purchase-item">
                        <img src={Purchase3} alt="" />
                        <div className="Purchase-txt3">
                            <p>NEW TECHNOLOGY & BUILD</p>
                            <Radio groupId="purchase3" />
                        </div>
                    </div>
                </div>
                <div className="heros1-txt">
                    <h1>All kind of parts that <br />You need can find here</h1>
                    <button className="edit">Shop now</button>
                </div>
                <span className="mau">
                    <h1>Get you car with the qualitative <br />and cleaned way</h1>
                </span>
                <div className="Gadi">
                    <img src={Gadi} alt="" />

                </div>

            </div>

            <div className="end">
                <h1>All of our products</h1>
                <p>All best seller products are now available for you and you can buy this product from here anytime so shop now</p>
            </div>
            <div>
                <div className="pic1">
                    <img src={New1} alt="" />
                    <img src={New2} alt="" />
                    <img src={New3} alt="" />
                </div>
                <div className="brand">
                    <div className="pic2">
                        <img src={New4} alt="" />
                        <img src={New5} alt="" />
                        <img src={New6} alt="" />
                    </div>

                    <div className="division-wrapper">
                        <div className="div-txt">
                            <h1>Flash Deals</h1>
                            <p>Hurry up and get 25% discount </p>
                            <button className="button">shop now</button>
                            <FlashTimer />
                        </div>

                        <img className="divison" src={Branding} alt="" />
                    </div>

                </div>

            </div>
            < Footer />
        </div>
    );
}

export default LandingPage;
