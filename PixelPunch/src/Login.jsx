import './Login.css'
import { useState } from "react";
import Auth from "./assets/videos/Login.mp4";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const handleChange = e => {
    //     setData({ ...data, [e.target.name]: e.target.value });
    // };
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log(data);

        if (data.token) {
            localStorage.setItem("token", data.token)
            alert("Logged in")

        } else {
            alert(data.error)
        }
    }

    const WrappedStyle = {
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
        width: '700px',
        marginTop: '20px',
        marginLeft: '50%',
        paddingTop: "90px",
        paddingLeft: '90px',
        paddingRight: '90px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '20px',
        backgroundColor: 'rgba(249, 249, 243, 0.14)',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        height: "450px",
        gap: '50px',
        // color: 'white',
        marginRight: "20%",
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

    return (
        <>
            {/* <div style={style.container}>
                <h2>Login</h2>

                <input name="username"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    style={style.input}
                />
                <input name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    style={style.input}
                />
            </div> */}
            <div style={WrappedStyle}>
                <video style={videoStyle} src={Auth} autoPlay muted loop />

                <div style={containerStyle}>
                    <h2 style={{ color: 'white' }}>Login</h2>
                    <form onSubmit={handleLogin}>


                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter the Username'
                            style={inputStyle}
                        />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter the Password'
                            type='password'
                            style={inputStyle}
                        />
                        <button type='submit'
                            style={btnStyle}>Login</button>
                        {/* <a href={"http://localhost:5000/api/auth/Reg"}>Signup here</a> */}


                    </form>
                </div>
            </div>
        </>
    )

}
export default Login