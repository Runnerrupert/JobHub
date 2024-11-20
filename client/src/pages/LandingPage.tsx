import { Link } from 'react-router-dom';

const LandingPage = () => {
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