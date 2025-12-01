import './Login.css'
import { useState } from "react";



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

            <form onSubmit={handleLogin}>
                <h2>Login</h2>

                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter the Username'
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter the Password'
                    type='password'
                />
                <button type='submit'>Login</button>


            </form>


        </>
    )

}
export default Login