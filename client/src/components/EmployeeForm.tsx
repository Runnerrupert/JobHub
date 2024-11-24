import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../graphql/mutations';
import { GET_EMPLOYEES } from '../graphql/queries';
import { Employee } from '../interfaces/Employee';
import '../styles/index.css';

interface EmployeeFormProps {
  employee: Employee | null;
  onEditComplete?: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onEditComplete }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
  });

  const [isEmployeeAdded, setIsEmployeeAdded] = useState(false);

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
    onCompleted: () => {
      setFormState({
        name: '',
        email: '',
        phoneNumber: '',
        role: '',
      });
      setIsEmployeeAdded(true);
    },
  });

  const [updateEmployee, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
    onCompleted: () => {
      setFormState({
        name: '',
        email: '',
        phoneNumber: '',
        role: '',
      });
      if (onEditComplete) {
        onEditComplete();
      }
    },
  });

  useEffect(() => {
    if (employee) {
      setFormState({
        name: employee.name || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        role: employee.role || '',
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (employee) {
      updateEmployee({ variables: { input: formState, id: employee.id } }).catch((err) => {
        console.error('Error updating employee: ', err);
      });
    } else {
      addEmployee({ variables: { input: formState } }).catch((error) => {
        console.error('Error adding employee:', error);
      });
    }

    setFormState({
      name: '',
      email: '',
      phoneNumber: '',
      role: '',
    });
  };

  return (
    <div>
      <form className="employee-form" onSubmit={handleSubmit}>
        <label htmlFor="employeeName">Employee Name:</label>
        <input
          type="text"
          id="employeeName"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="employeeEmail">E-mail:</label>
        <input
          type="email"
          id="employeeEmail"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="employeePhone">Phone Number:</label>
        <input
          type="tel"
          id="employeePhone"
          name="phoneNumber"
          value={formState.phoneNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="employeeRole">Role:</label>
        <input
          type="text"
          id="employeeRole"
          name="role"
          value={formState.role}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading || updateLoading}>
          {loading || updateLoading ? 'Submitting...' : employee ? 'Update Employee' : 'Add New Employee'}
        </button>
      </form>

      {isEmployeeAdded && <p className='success-message'>Employee added successfully!</p>}
      {error && <p className='error-message'>Error adding employee, please try again.</p>}
      {updateError && <p>Error updating employee, please try again.</p>}
    </div>
  );
};

export default EmployeeForm;
