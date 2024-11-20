import { Link } from "react-router-dom";
import auth from '../utils/auth';

const Navbar = () => {
  return (
    <div>
        <nav>
            <div>
            <Link to="/home">
                <img></img>
            </Link>
            <div>
                <ul>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/customers'>Customers</Link>
                    </li>
                    <li>
                        <Link to='/employees'>Employees</Link>
                    </li>
                    <li>
                        <Link to='/jobs'>Jobs</Link>
                    </li>
                </ul>
                <button type="button" onClick={() => {auth.logout();}}>Logout</button>
            </div>
            </div>
        </nav>
    </div>
  )};

export default Navbar;
