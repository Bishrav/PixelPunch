import "./Signup.css"
import { useState } from "react";
import axios from "axios";

function Register() {
    const [form, setForm] = useState({
        username: "",
        EmailAddress: "",
        password: "",
        conirmPassword: "",
    })
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        const res = await axios.post("url here", form)
        alert(res.data.message)
    }
    return (
        <>
            <div style={style.container}>
                <h2>Sign In</h2>

                <input name="username"
                    placeholder="Enter your full Name"
                    onChange={handleChange}
                    style={style.input}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Enter the password"
                    onChange={handleChange}
                    style={style.input}
                />
                <input
                    name="EmailAddress"
                    placeholder="Enter the Email"
                    onChange={handleChange}
                    style={style.input}
                />
                <input
                    name="ConfirmPassword"
                    type="password"
                    placeholder="Enter the password"
                    onChange={handleChange}
                    style={style.input}
                />
                <button onClick={handleSubmit} style={style.btn}>
                    Signup
                </button>\
                <hr />
                <a href="continue with google ko api hit from backend Google">
                    <button style={style.oauthBtn}></button>
                </a>
                <a href="continue with google ko api hit from backend Github">
                    <button style={style.oauthBtn}></button>
                </a>

            </div>
        </>
    )
}
export default Register