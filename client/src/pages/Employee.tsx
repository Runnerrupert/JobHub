import React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const Employee: React.FC = () => {
  return (
    <div>
      <h1>This is the Employee Page</h1>
      {/* // Add forms to add, update, and delete employees */}
      <EmployeeForm />

      {/* // Add a table to display all employees */}
      <EmployeeList />
    </div>
  );
};

export default Employee;