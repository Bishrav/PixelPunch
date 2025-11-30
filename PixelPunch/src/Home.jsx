import "./Home.css";
import Logo from "./assets/Hero.svg";
import Hero from "./assets/Over.png";

export default function Home() {
    return (
        <>
            <nav className="top-navbar">
                <div className="nav-left">
                    <nav class="navbar fixed-top">
                        <div className="container-fluid">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="offcanvas offcanvas-start"
                                tabindex="-1"
                                id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel"
                            >
                                <div className="offcanvas-header">
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li className="nav-item">
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Action
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Another action
                                                    </a>
                                                </li>
                                                <li></li>
                                                <li>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Something else here
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <form className="d-flex mt-3" role="search">
                                        <input
                                            className="form-control me-2"
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                        />
                                        <button
                                            className="btn btn-outline-success"
                                            type="submit"
                                        >
                                            Search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="nav-center">
                    <img src={Logo} alt="logo" className="nav-logo" />
                </div>

                <div className="nav-right">
                    <span className="nav-text">DEALERS</span>
                </div>
            </nav>

            {/* NAVBAR LINE */}
            <div className="nav-line"></div>

            {/* HERO SECTION */}
            <div className="hero">
                <img src={Hero} className="hero-bg" alt="hero" />

                {/* TEXT */}
                <div className="hero-text">
                    <h1 className="hero-title">PIXEL</h1>
                    <p className="hero-subtitle">PUNCH</p>
                </div>

                {/* BUTTON */}
                <button className="discover-btn">DISCOVER NOW</button>
            </div>
        </>
    );
}
