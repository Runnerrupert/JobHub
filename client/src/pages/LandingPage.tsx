import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";

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
            <h1>This is the Landing Page</h1>
            {/* // Add Title and Buttons to login, or create an account */}
            <section>
                <button type="button"><Link to='/login'>Login</Link></button>
                <button type="button"><Link to='/create-account'>Create Account</Link></button>
            </section>
        </div>
    );
};

export default LandingPage;