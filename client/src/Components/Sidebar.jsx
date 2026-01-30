import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const Sidebar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleNavigation = (path) => {
        navigate(path);
        // Close offcanvas programmatically
        const offcanvasElement = document.getElementById("offcanvasNavbar");
        if (offcanvasElement) {
            // Bootstrap 5 way
            const bsOffcanvas = window.bootstrap ? window.bootstrap.Offcanvas.getInstance(offcanvasElement) : null;
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            } else {
                // Fallback
                const closeBtn = offcanvasElement.querySelector('[data-bs-dismiss="offcanvas"]');
                if (closeBtn) closeBtn.click();
            }
        }
    };

    return (
        <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            style={{
                backgroundColor: 'rgba(5, 5, 5, 0.9)',
                background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                color: '#fff',
                width: '700px', // Very wide as requested
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '20px 0 50px rgba(0,0,0,0.7)',
                height: '100vh',
                maxWidth: '90vw',
                zIndex: 2000 // Ensure it's on top of everything
            }}
        >
            <div className="offcanvas-header" style={{
                padding: '40px 30px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h2 className="offcanvas-title" id="offcanvasNavbarLabel" style={{
                    fontFamily: '"Orbitron", sans-serif', // Assuming generic for now, or fallback
                    letterSpacing: '3px',
                    fontWeight: '700',
                    fontSize: '1.4rem',
                    margin: 0,
                    textTransform: 'uppercase',
                    background: 'linear-gradient(45deg, #fff, #aaa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Pixel Punch
                </h2>

                {/* Custom Close Button */}
                <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        color: 'white',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            <div className="offcanvas-body" style={{
                padding: '30px 0',
                flexGrow: 1,
                overflowY: 'auto'
            }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>

                    <SidebarItem label="Landing" onClick={() => handleNavigation("/")} />
                    <SidebarItem label="Home" onClick={() => handleNavigation("/Home")} />
                    <SidebarItem label="Shop" onClick={() => handleNavigation("/shop")} />
                    <SidebarItem label="Contemporary" onClick={() => handleNavigation("/Contemporary")} />
                    <SidebarItem label="Categories" onClick={() => handleNavigation("/categories")} />
                    <SidebarItem label="Career" onClick={() => handleNavigation("/career")} />

                    <div style={{ margin: '20px 30px', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                    {isAuthenticated ? (
                        <>
                            <SidebarItem label="Profile" onClick={() => handleNavigation("/Profile")} />
                            <SidebarItem label="Dashboard" onClick={() => handleNavigation("/Dashboard")} />


                            <li
                                onClick={() => { logout(); handleNavigation("/login"); }}
                                style={{
                                    padding: '15px 30px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    color: '#ff6b6b',
                                    marginTop: '10px'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.paddingLeft = '40px'}
                                onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '30px'}
                            >
                                <span style={{
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>Logout</span>
                            </li>
                        </>
                    ) : (
                        <>
                            <SidebarItem label="Login" onClick={() => handleNavigation("/login")} />
                            <SidebarItem label="Signup" onClick={() => handleNavigation("/register")} />
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

const SidebarItem = ({ label, onClick }) => {
    return (
        <li
            onClick={onClick}
            style={{
                padding: '15px 30px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.paddingLeft = '45px';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = '30px';
                e.currentTarget.style.background = 'transparent';
            }}
        >
            <span style={{
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '500',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.8)'
            }}>
                {label}
            </span>
        </li>
    );
}

export default Sidebar;
