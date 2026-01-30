import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    return (token || urlToken) ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    // We do NOT check urlToken here. If a token is in URL (Google Auth), 
    // we want to render the child (Login) so useAuth can parse and save it.
    // If we redirect immediately, we lose the token params.

    return token ? <Navigate to="/" /> : children;
};
