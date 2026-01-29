import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async (authToken) => {
            try {
                const response = await axios.get("http://localhost:5000/api/me", {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setUser(response.data.user);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        // Check URL for token from OAuth
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get("token");

        if (urlToken) {
            localStorage.setItem("token", urlToken);
            setToken(urlToken);
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            fetchUser(urlToken);
        } else if (token && !user) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, [token, user]);

    const login = (newToken, userData) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return {
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout
    };
};
