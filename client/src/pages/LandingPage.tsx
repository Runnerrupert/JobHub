import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import '../styles/landingPage.css';

import Logo from '../assets/images/JobHubLogo.png';

const LandingPage = () => {

    const navigate = useNavigate();

    // Check login status if 
    useEffect(() => {
        if (auth.loggedIn()) {
            navigate("/home"); 
        } 
    }, []);

    return (
        <div className="landing-container">
            <div className="landing-card">
                <img src={Logo} alt="JobHub Logo" className="landing-logo" />
                <div className="landing-buttons">
                    <Link to="/login">
                        <button className="landing-button">Login</button>
                    </Link>
                    <Link to="/create-account">
                        <button className="landing-button">Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;