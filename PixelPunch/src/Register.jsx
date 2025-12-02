import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    confirmPassword: form.confirmPassword,
                }
            );
            alert(res.data.message || "Registered successfully");
            setForm({ username: "", email: "", password: "", confirmPassword: "" });
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Registration failed");
        }


    };

    // Inline styles
    const style = {
        container: {
            display: "flex",
            flexDirection: "column",
            width: "350px",
            margin: "50px auto",
            padding: "25px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            fontFamily: "Arial, sans-serif",
        },
        input: {
            margin: "10px 0",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
        },
        btn: {
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            marginTop: "10px",
        },
        oauthBtn: {
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4285F4",
            color: "white",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
        },
        hr: {
            margin: "20px 0",
        },
    };

    return (<div style={style.container}>
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>


        <input
            name="username"
            placeholder="Enter your full name"
            onChange={handleChange}
            value={form.username}
            style={style.input}
        />
        <input
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            value={form.email}
            style={style.input}
        />
        <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={form.password}
            style={style.input}
        />
        <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            value={form.confirmPassword}
            style={style.input}
        />

        <button onClick={handleSubmit} style={style.btn}>
            Signup
        </button>

        <hr style={style.hr} />

        <a href="http://localhost:5000/api/auth/google">
            <button style={style.oauthBtn}>Continue with Google</button>
        </a>

        <a href="http://localhost:5000/api/auth/github">
            <button style={style.oauthBtn}>Continue with Github</button>
        </a>
    </div>


    );
}

export default Register;
