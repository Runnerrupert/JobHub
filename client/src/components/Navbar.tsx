import { Link } from "react-router-dom";
import auth from '../utils/auth';
import "./Navbar.css";
import Logo from '../assets/images/JobHubLogo.png';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home">
          <img src={Logo} alt="JobHub Logo" />
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button type="button" onClick={() => auth.logout()}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
