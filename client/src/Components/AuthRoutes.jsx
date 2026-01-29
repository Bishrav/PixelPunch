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
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    return (token || urlToken) ? <Navigate to="/Dashboard" /> : children;
};
