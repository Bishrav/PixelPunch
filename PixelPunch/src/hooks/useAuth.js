import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get("token");
            const urlUser = params.get("user");

            if (urlToken && urlUser) {
                try {
                    const userData = JSON.parse(urlUser);
                    localStorage.setItem("token", urlToken);
                    localStorage.setItem("user", JSON.stringify(userData));
                    setToken(urlToken);
                    setUser(userData);

                    // Clean URL without losing path
                    const url = new URL(window.location.href);
                    url.searchParams.delete("token");
                    url.searchParams.delete("user");
                    window.history.replaceState({}, document.title, url.pathname + url.search);

                    navigate("/Dashboard");
                } catch (e) {
                    console.error("Error parsing user from URL", e);
                }
            } else {
                const storedUser = localStorage.getItem("user");
                const storedToken = localStorage.getItem("token");
                if (storedUser && storedToken) {
                    try {
                        setUser(JSON.parse(storedUser));
                        setToken(storedToken);
                    } catch (e) {
                        console.error("Error parsing stored user", e);
                        localStorage.removeItem("user");
                        localStorage.removeItem("token");
                        setToken(null);
                        setUser(null);
                    }
                }
            }
        };

        checkAuth();
    }, [navigate]);

    const login = (userData, userToken) => {
        localStorage.setItem("token", userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(userToken);
        setUser(userData);
        navigate("/Dashboard");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        navigate("/login");
    };

    const isAuthenticated = !!token;

    return { user, token, isAuthenticated, login, logout };
};
