import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./services/api.js";
import Login from "./assets/videos/Signup.mp4";
import Google from "./assets/Google.png";
import Github from './assets/Github.png'

import { useAuth } from "./hooks/useAuth.js";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const { data } = await API.post("/auth/register", {
                username: form.username,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword,
            });
            alert(data.message || "Registered successfully");
            if (data.token) {
                login(data.user, data.token);
            } else {
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Registration failed");
        }
    };

    // Styles
    const wrapperStyle = {
        minHeight: '100vh',
        width: '100%',
        marginLeft: '0px',
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
        background: '#000',        // fallback if video doesn't load
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const videoStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
    };

    const containerStyle = {
        position: 'relative',
        zIndex: 1,           // in front of video
        width: '750px',
        marginTop: '20px',
        paddingLeft: '80px',
        paddingRight: '80px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '20px',
        backgroundColor: 'rgba(249, 249, 243, 0.14)',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        // color: 'white',
        marginRight: "70%",
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        width: '100%',
    };

    const btnStyle = {
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        backgroundColor: '#fafafaff',
        borderRadius: '30px',
        color: 'black',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
    };


    const hrStyle = {
        margin: '20px 0',
    };
    return (
        <div style={wrapperStyle}>
            {/* full-screen video background */}
            <video style={videoStyle} src={Login} autoPlay muted loop />

            <div style={containerStyle}>
                <h1 style={{ color: "white" }}>Sign In</h1>

                <div className="down">
                    <h4>Username</h4>
                    <input
                        name="username"
                        placeholder="Enter your full name"
                        value={form.username}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <h4>Email Address</h4>
                    <input
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <h4>Password</h4>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <h4>Confirm Password</h4>
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <button onClick={handleSubmit} style={btnStyle}>
                        Create Account
                    </button>

                    <hr style={hrStyle} />

                    <div className="logo-container" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',    // space between images
                        marginTop: '20px'
                    }}>
                        <a href="http://localhost:5000/api/auth/google">
                            <img className="logo" src={Google} alt="Google" style={{ width: '50px', height: '50px' }} />
                        </a>

                        <a href="http://localhost:5000/api/auth/github">
                            <img className="logo" src={Github} alt="Github" style={{ width: '50px', height: '50px' }} />
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Register;
