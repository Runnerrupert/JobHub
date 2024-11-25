import React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Navbar from '../components/Navbar';
import type { Employee } from '../interfaces/Employee';
import '../styles/employees.css';

const Employee: React.FC = () => {
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null);

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  return (
    <div className="employee-page">
      <Navbar />
      <div className="employee-content">
        <h2>Please Enter Employee Information</h2>
        {/* Form to add, update, and delete employees */}
        <EmployeeForm
          employee={editingEmployee}
          onEditComplete={() => setEditingEmployee(null)}
        />
        {/* Cards to display all employees */}
        <EmployeeList editEmployee={handleEditEmployee} />
      </div>
    </div>
  );
};

export default Employee;