import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import LandingPage from "./LandingPage.jsx";
import Contemporary from "./Contemporary.jsx";
import Dashboard from "./Dashboard.jsx"
import Profile from "./Profile.jsx"
import Projects from "./Projects.jsx"
import AboutUs from "./AboutUs.jsx"
import CarList from "./CarList.jsx"
import Career from "./Career.jsx"
import CurrentModel from "./CurrentModel.jsx"
import Offers from "./Offers.jsx"
import Collections from "./Collections.jsx"
import Shop from "./Shop.jsx"
import { PrivateRoute, PublicRoute } from "./Components/AuthRoutes.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Home" element={<Home />} />
                <Route
                    path="/register"
                    element={<PublicRoute><Register /></PublicRoute>}
                />
                <Route
                    path="/login"
                    element={<PublicRoute><Login /></PublicRoute>}
                />
                <Route path="/Contemporary" element={<Contemporary />} />
                <Route
                    path="/Dashboard"
                    element={<PrivateRoute><Dashboard /></PrivateRoute>}
                />
                <Route
                    path="/Profile"
                    element={<PrivateRoute><Profile /></PrivateRoute>}
                />
                <Route
                    path="/projects"
                    element={<PrivateRoute><Projects /></PrivateRoute>}
                />
                <Route
                    path="/about-us"
                    element={<PrivateRoute><AboutUs /></PrivateRoute>}
                />
                <Route
                    path="/car-list"
                    element={<PrivateRoute><CarList /></PrivateRoute>}
                />
                <Route
                    path="/career"
                    element={<PrivateRoute><Career /></PrivateRoute>}
                />
                <Route
                    path="/current-model"
                    element={<PrivateRoute><CurrentModel /></PrivateRoute>}
                />
                <Route path="/offers" element={<Offers />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/shop" element={<Shop />} />
            </Routes>
        </Router>
    )
}
export default App