import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [token]);

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
