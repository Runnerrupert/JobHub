import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";

import Logo from '../assets/images/logo.png';

const LandingPage = () => {

    const navigate = useNavigate();

    // Check login status if 
    useEffect(() => {
        if (auth.loggedIn()) {
            navigate("/home"); 
        } 
    }, []);

    return (
        <div>
            <h1>Jobhub</h1>
            <img src={Logo}></img>
            {/* // Add Title and Buttons to login, or create an account */}
            <section>
                <button type="button"><Link to='/login'>Login</Link></button>
                <button type="button"><Link to='/create-account'>Create Account</Link></button>
            </section>
        </div>
    );
};

export default LandingPage;