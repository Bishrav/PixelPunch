import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Sidebar = () => {
    useEffect(() => {
        const offcanvas = document.getElementById("offcanvasNavbar");
        const overlay = document.getElementById("blur-overlay");
        if (!offcanvas || !overlay) return;

        const handleShown = () => {
            overlay.style.opacity = "1";
            overlay.style.pointerEvents = "auto";
        };

        const handleHidden = () => {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
        };

        offcanvas.addEventListener("shown.bs.offcanvas", handleShown);
        offcanvas.addEventListener("hidden.bs.offcanvas", handleHidden);

        // Cleanup overlay on unmount
        return () => {
            offcanvas.removeEventListener("shown.bs.offcanvas", handleShown);
            offcanvas.removeEventListener("hidden.bs.offcanvas", handleHidden);
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
        };
    }, []);

    return (
        <div id="blur-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.44)',
            backdropFilter: 'blur(8px)',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.4s ease-in-out',
            zIndex: 1040
        }}></div>
    );
};

export const SidebarOffcanvas = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleNavigation = (path) => {
        navigate(path);

        // Use standard Bootstrap way to hide offcanvas
        const offcanvasElement = document.getElementById("offcanvasNavbar");
        if (typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.hide();
        } else {
            // Fallback for direct DOM manipulation if bootstrap isn't available globally
            offcanvasElement.classList.remove('show');
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) backdrop.remove();
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    };

    return (
        <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                color: '#fff',
                width: '350px',
                borderRight: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <div className="offcanvas-header" style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h2 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ letterSpacing: '2px', fontWeight: '800' }}>PIXEL PUNCH</h2>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body" style={{ padding: '0' }}>
                <ul className="sidelist" style={{ listStyle: 'none', padding: '20px 0', margin: 0 }}>
                    <li onClick={() => handleNavigation("/Home")} style={liStyle}>
                        <span style={linkText}>HOME</span>
                    </li>
                    <li onClick={() => handleNavigation("/about-us")} style={liStyle}>
                        <span style={linkText}>ABOUT US</span>
                    </li>
                    <li onClick={() => handleNavigation("/career")} style={liStyle}>
                        <span style={linkText}>CAREER</span>
                    </li>
                    <li onClick={() => handleNavigation("/Contemporary")} style={liStyle}>
                        <span style={linkText}>CONTEMPORARY</span>
                    </li>
                    <li onClick={() => handleNavigation("/current-model")} style={liStyle}>
                        <span style={linkText}>CURRENT MODEL</span>
                    </li>
                    <li onClick={() => handleNavigation("/car-list")} style={liStyle}>
                        <span style={linkText}>CAR LIST</span>
                    </li>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 40px' }}></div>

                    {isAuthenticated ? (
                        <>
                            <li onClick={() => handleNavigation("/Dashboard")} style={liStyle}>
                                <span style={linkText}>DASHBOARD</span>
                            </li>
                            <li onClick={() => handleNavigation("/Profile")} style={liStyle}>
                                <span style={linkText}>PROFILE</span>
                            </li>
                            <li onClick={() => { logout(); handleNavigation("/login"); }} style={{ ...liStyle, color: '#ff4d4d' }}>
                                <span style={linkText}>LOGOUT</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li onClick={() => handleNavigation("/login")} style={liStyle}>
                                <span style={linkText}>LOGIN</span>
                            </li>
                            <li onClick={() => handleNavigation("/register")} style={liStyle}>
                                <span style={linkText}>SIGNUP</span>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

const liStyle = {
    cursor: 'pointer',
    padding: '15px 40px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
};

const linkText = {
    fontSize: '1.2rem',
    fontWeight: '500',
    letterSpacing: '1px',
    transition: 'transform 0.3s ease',
};

export default Sidebar;
