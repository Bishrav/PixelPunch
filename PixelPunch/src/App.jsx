import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import LandingPage from "./LandingPage.jsx";
import Contemporary from "./Contemporary.jsx";
import Dashboard from "./Dashboard.jsx"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path = "/Contemporary" element ={<Contemporary />} />
                <Route path = "/Dashboard" element = {<Dashboard />} />
            </Routes>
        </Router>
    )
}
export default App