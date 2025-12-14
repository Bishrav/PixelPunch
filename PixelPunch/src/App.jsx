import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import LandingPage from "./LandingPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </Router>
    )
}
export default App