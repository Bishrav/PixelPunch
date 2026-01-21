import "./Contemporary.css";
import Logo from "./assets/ContLogo.png";
import Profile from "./assets/Profile.png";
import Cart from "./assets/Cart.png";
import Search from "./assets/Search.png";
import Hero from "./assets/HeroIm.png";
import Card from "./Components/Card";
import Footer from "./Footer";
import Car1 from "./assets/Collection1.png";
import Car2 from "./assets/Collection2.png";
import Car3 from "./assets/Collection3.png";
import Car4 from "./assets/Collection4.png";
import Car5 from "./assets/Collection5.png";
import Car6 from "./assets/Collection6.png";
import Car7 from "./assets/Collection7.png";
import Car8 from "./assets/Collection8.png";
import New1 from "./assets/New1.png"
import New2 from "./assets/New2.png"
import New3 from "./assets/New3.png"
import New4 from "./assets/New4.png"
import New5 from "./assets/New5.png"
import New6 from "./assets/New6.png"
import Gwagon from "./assets/Gwagon.png"
import lamborghini from "./assets/lamborghini.png"
import porsche from "./assets/porsche.png"
import Arrrow from "./assets/Arrow 4.png"
import Customer from "./assets/Vector.png"
import sheild from "./assets/shield.png"
import Line from "./assets/Line.png"

const cars = [Car1, Car2, Car3, Car4, Car5, Car6, Car7, Car8];
const cars1 = [New1, New2, New3, New4, New5, New6, Car7, Car8];

function Contemporary() {
    return (
        <section className="contemporary">

            {/* NAVBAR */}
            <nav className="navbar">
                <img src={Logo} alt="Logo" className="logo" />

                <div className="nav-links">
                    <span>Shop</span>
                    <span>Collections</span>
                    <span>Categories</span>
                    <span>Offers</span>
                </div>

                <div className="nav-icons">
                    <img src={Profile} alt="Profile" />
                    <img src={Search} alt="Search" />
                    <img src={Cart} alt="Cart" />
                </div>
            </nav>

            {/* HERO */}
            <div className="hero">
                <img src={Hero} alt="Hero" className="hero-img" />

                <div className="hero-text">
                    <h1>
                        FREE GIFT <br /> WITH <br /> EVERY <br /> PURCHASE
                    </h1>
                </div>
            </div>

            {/* BRAND SECTION */}
            <div className="brand">
                <h1>Car Collection</h1>
                <button>New Collection</button>
            </div>

            {/* COLLECTION GRID */}
            <div className="collection-wrapper">
                <div className="collection-track">
                    {cars.concat(cars).map((car, index) => (
                        <img key={index} src={car} alt="Car" />
                    ))}
                </div>
                <div className="collection-track">
                    {cars.concat(cars1).map((car, index) => (
                        <img key={index} src={car} alt="Car" />
                    ))}
                </div>
            </div>
            <button className="seller">Bestseller</button>
            <div className="more">
                <img src={Gwagon} alt="" />
                <img src={porsche} alt="" />
                <img src={lamborghini} alt="" />
                <div className="more-txt">
                    <p>G wagon Tank</p>
                    <p>Porsche 911</p>
                    <p>Lamborgini</p>
                </div>
            </div>
            <div className="haveto">
                <h1>Join Our Mailing List And <br />Recieve A 10% Discount Code</h1>
                <input type="text" placeholder="Enter your email" />
                <button ><img src={Arrrow} alt="" /></button>
            </div>

            <div className="customcare">
                <div className="first">
                    <img src={Customer} alt="" />
                    <p>Customer Service <br />Reach out to out team if you need any help</p>

                </div>
                <div className="third">
                    <img src={Line} alt="" />
                </div>
                <div className="second">
                    <img src={sheild} alt="" />
                    <p>Secure Payment <br />Your payment information is processed securely</p>
                </div>
            </div>
            <div className="heading">
                <h1>~Latest Article~</h1>
            </div>
            <div className="card-section">
                <Card />
                <Card />
                <Card />
                
                
                
            </div>
            <footer>
                <Footer />
            </footer>
            
            
            


        </section>
    );
}

export default Contemporary;
