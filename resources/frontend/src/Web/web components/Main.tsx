import Home from "./Home.tsx";
import Navbar from "./Navbar.tsx";
import { useState } from "react";
import LoginForm from "../../Forms/LoginForm.tsx";
import RegistrationForm from "../../Forms/RegistrationForm.tsx";

function Main() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

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

    return (
        <div>
            <Navbar onOpenLogin={handleOpenLogin} onOpenRegister={handleOpenRegister}/>
            {showLogin && (
                <LoginForm
                    onClose={handleCloseForms}
                    onSwitchToRegister={handleOpenRegister} onLoginSuccess={function (): void {
                    throw new Error("Function not implemented.");
                }}                />
            )}

            {showRegister && (
                <RegistrationForm
                    onClose={handleCloseForms}
                    onSwitchToLogin={handleOpenLogin}
                />
            )}
            <Home />
        </div>
    );
}

export default Main;
