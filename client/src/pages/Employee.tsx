import React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Navbar from '../components/Navbar';
import type { Employee } from '../interfaces/Employee';

const Employee: React.FC = () => {
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null> (null);

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1>This is the Employee Page</h1>
        {/* // Add forms to add, update, and delete employees */}
        <EmployeeForm employee={editingEmployee} onEditComplete={() => setEditingEmployee(null)}/>

        {/* // Add a table to display all employees */}
        <EmployeeList editEmployee={handleEditEmployee}/>
      </div>
    </div>
  );
};

export default Employee;