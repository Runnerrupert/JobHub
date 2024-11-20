import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Link to="/Customers">Customers</Link> 
        <Link to="/Employee">Employees</Link>
        <Link to="/Jobs">Jobs</Link>
      </div>
      <div>
        <h1>This is the Home Page</h1>

        // Add object to display scheduled jobs, filtered by employee, scheduled by time, etc.
      </div>
    </div>
  );
};

export default Home;
