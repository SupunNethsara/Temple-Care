import Home from "./Home";
import Navbar from "./Navbar";
import { useState } from "react";
import LoginForm from "../../Forms/LoginForm";
import RegistrationForm from "../../Forms/RegistrationForm";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MainDashboard } from "../../Components/User Dashboard/MainDashboard";
import CheckingStats from "../../Components/User Dashboard/Routing/CheckingStats.tsx";
import Dana from "../../Components/User Dashboard/Routing/Dana.tsx";

function Main() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleOpenLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleOpenRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleCloseForms = () => {
        setShowLogin(false);
        setShowRegister(false);
    };

    const handleLoginSuccess = ()  => {
        navigate('/MainDashboard');
    };

    const showNavbar = !location.pathname.startsWith("/MainDashboard");

    return (
        <div>
            {showNavbar && (
                <Navbar onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister} />
            )}

            {showLogin && (
                <LoginForm
                    onClose={handleCloseForms}
                    onSwitchToRegister={handleOpenRegister}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}

            {showRegister && (
                <RegistrationForm
                    onClose={handleCloseForms}
                    onSwitchToLogin={handleOpenLogin}
                />
            )}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MainDashboard/*" element={<MainDashboard />} >
                    <Route index element={<CheckingStats />} />
                    <Route path="danaevents" element={<Dana />} />
                </Route>
            </Routes>
        </div>
    );
}

export default Main;
